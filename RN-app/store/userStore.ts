import {
  exchangeToken,
  extractAuthCodeFromUrl,
  getNewAccessToken,
} from "@/services/authService";
import { fetchUserProfile } from "@/services/profileService";
import { tokenStorage } from "@/services/tokenStorageService";
import { AuthToken, UserProfile } from "@/types";
import { create } from "zustand";

enum AuthErrorType {
  MISSING_REDIRECT_URI = "missing_redirect_uri",
  INVALID_REDIRECT_URI = "invalid_redirect_uri",
  INVALID_AUTH_CODE = "invalid_auth_code",
  TOKEN_EXCHANGE_FAILED = "token_exchange_failed",
  REFRESH_TOKEN_FAILED = "refresh_token_failed",
  UNKNOWN_ERROR = "unknown_error",
}

interface AuthError {
  type: AuthErrorType;
  message: string;
  details?: string;
}

enum UserProfileErrorType {
  NOT_AUTHENTICATED = "not_authenticated",
  FETCH_FAILED = "fetch_failed",
  UNAUTHORIZED = "unauthorized",
  UNKNOWN_ERROR = "unknown_error",
}

interface UserProfileError {
  type: UserProfileErrorType;
  message: string;
  details?: string;
}

interface UserState {
  authToken: AuthToken | null;
  tokenCreatedAt: number | null;
  userProfile: UserProfile | null;
  authError: AuthError | null;
  userProfileError: UserProfileError | null;
}

interface UserStore extends UserState {
  // Setters
  resetStore: () => void;
  setAuthToken: (token: AuthToken | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setAuthError: (error: AuthError | null) => void;
  setUserProfileError: (error: UserProfileError | null) => void;

  // Computed getters
  isTokenExpired: () => boolean;
  checkAuthentication: () => Promise<boolean>;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;

  // Actions
  restoreTokensFromStorage: () => Promise<boolean>;
  signInWith42: (url: string | null) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  loadUserProfile: () => Promise<boolean>;
}

const initialState: UserState = {
  authToken: null,
  tokenCreatedAt: null,
  userProfile: null,
  authError: null,
  userProfileError: null,
};

export const useUserStore = create<UserStore>((set, get) => ({
  ...initialState,

  // Setters -------------------------------------------------------------------
  resetStore: () => set({ ...initialState }),
  setAuthToken: (token) => set({ authToken: token }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setAuthError: (error) => set({ authError: error }),
  setUserProfileError: (error) => set({ userProfileError: error }),

  // Computed getters ----------------------------------------------------------

  isTokenExpired: () => {
    const authToken = get().authToken;
    if (!authToken) {
      return true;
    }
    const expiresAt = authToken.createdAt + authToken.expiresIn * 1000;
    return Date.now() > expiresAt;
  },
  checkAuthentication: async () => {
    const authToken = get().authToken;
    if (!authToken) {
      return false;
    }

    // If token is not expired, user is authenticated
    if (!get().isTokenExpired()) {
      return true;
    }

    // Token is expired, try to refresh it
    await get().refreshAccessToken();

    // Return true if refresh was successful (no auth error)
    return !get().authError;
  },
  getAccessToken: () => {
    return get().authToken?.accessToken || null;
  },
  getRefreshToken: () => {
    return get().authToken?.refreshToken || null;
  },

  // Actions -------------------------------------------------------------------

  // Restore tokens from storage
  //
  // 1. Get tokens from secure storage
  // 2. If tokens exist, check if they're valid
  // 3. If expired, try to refresh
  // 4. If refresh fails or no tokens, return false
  restoreTokensFromStorage: async () => {
    try {
      // Get tokens from secure storage
      const tokenData = await tokenStorage.getTokenData();
      if (!tokenData) {
        console.log("No tokens found in storage");
        return false;
      }

      // Set the tokens in store
      get().setAuthToken(tokenData);

      // Check if token is expired
      if (get().isTokenExpired()) {
        console.log("Stored token is expired, attempting to refresh");

        // Try to refresh the token
        await get().refreshAccessToken();

        // Check if refresh was successful
        if (get().authError) {
          console.log("Token refresh failed:", get().authError?.message);
          get().resetStore();
          await tokenStorage.clear();
          return false;
        }

        console.log("Token refreshed successfully");
        return true;
      }

      console.log("Valid token restored from storage");
      return true;
    } catch (error) {
      console.error("Failed to restore tokens from storage:", error);
      get().resetStore();
      await tokenStorage.clear();
      return false;
    }
  },

  // Sign in with 42
  //
  // 1. extract auth code
  // 2. exchange auth code with access, refresh tokens
  // 3. save tokens to secure storage
  signInWith42: async (url: string | null) => {
    // Initialize states
    get().resetStore();

    console.log("Processing auth redirect URL:", url);

    // Check URL and extract auth code
    if (!url) {
      get().setAuthError({
        type: AuthErrorType.MISSING_REDIRECT_URI,
        message: "Redirect URI is missing.",
      });
      return false;
    }
    const authCode = extractAuthCodeFromUrl(url);
    if (!authCode) {
      get().setAuthError({
        type: AuthErrorType.INVALID_REDIRECT_URI,
        message: "Invalid redirect URI.",
      });
      return false;
    }

    // Exchange auth code for tokens
    let tokenResponse: AuthToken;
    try {
      tokenResponse = await exchangeToken(authCode);
    } catch (error) {
      get().setAuthError({
        type: AuthErrorType.TOKEN_EXCHANGE_FAILED,
        message: "Failed to exchange auth code for tokens.",
        details: error instanceof Error ? error.message : String(error),
      });
      return false;
    }

    // Save tokens to store and secure storage
    get().setAuthToken(tokenResponse);
    await tokenStorage.saveTokens(tokenResponse);

    console.log("User signed in successfully");
    return true;
  },

  // Sign out
  //
  // 1. Clear tokens from secure storage
  // 2. Update(reset) auth state
  signOut: async () => {
    await tokenStorage.clear();
    get().resetStore();
    console.log("User logged out successfully");
  },

  // Refresh access token
  //
  // 1. Check for existing refresh token
  // 2. Get new access token using refresh token
  // 3. Save new access token to store and secure storage
  refreshAccessToken: async () => {
    // Check for existing refresh token
    const refreshToken = get().getRefreshToken();
    if (!refreshToken) {
      get().setAuthError({
        type: AuthErrorType.REFRESH_TOKEN_FAILED,
        message: "No refresh token available.",
      });
      return;
    }

    // Get new access token using refresh token
    let newToken: AuthToken;
    try {
      newToken = await getNewAccessToken(refreshToken);
    } catch (error) {
      get().setAuthError({
        type: AuthErrorType.REFRESH_TOKEN_FAILED,
        message: "Failed to refresh access token.",
        details: error instanceof Error ? error.message : String(error),
      });
      return;
    }

    // Save new access token to store and secure storage
    get().setAuthToken(newToken);
    await tokenStorage.saveTokens(newToken);

    console.log("Access token refreshed successfully");
  },

  // Load user profile
  //
  // 1. check if access token is valid
  // 2. If valid, fetch user profile
  // 3. If not valid, refresh access token
  loadUserProfile: async () => {
    // check if user is authenticated (this will refresh token if needed)
    const isAuthenticated = await get().checkAuthentication();
    if (!isAuthenticated) {
      get().setUserProfileError({
        type: UserProfileErrorType.NOT_AUTHENTICATED,
        message: "User is not authenticated.",
      });
      return false;
    }

    // Fetch user profile
    try {
      const profile = await fetchUserProfile(get().getAccessToken()!);
      get().setUserProfile(profile);
      get().setUserProfileError(null);
      console.log("User profile loaded successfully");
      return true;
    } catch (error) {
      get().setUserProfileError({
        type: UserProfileErrorType.FETCH_FAILED,
        message: "Failed to fetch user profile.",
        details: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  },
}));
