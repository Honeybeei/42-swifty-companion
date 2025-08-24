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
  isAuthenticated: () => boolean;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;

  // Actions
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
  isAuthenticated: () => {
    const authToken = get().authToken;
    if (!authToken) {
      return false;
    }
    return true;
  },
  getAccessToken: () => {
    return get().authToken?.accessToken || null;
  },
  getRefreshToken: () => {
    return get().authToken?.refreshToken || null;
  },

  // Actions -------------------------------------------------------------------

  // Sign in with 42
  //
  // 1. extract auth code
  // 2. exchange auth code with access, refresh tokens
  // 3. save tokens to secure storage
  signInWith42: async (url: string | null) => {
    // Initialize states
    get().resetStore();

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
  // 2. Check if refresh token is expired
  // 3. Get new access token using refresh token
  // 4. Save new access token to store and secure storage
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

    // Check if refresh token is expired
    if (get().isTokenExpired()) {
      get().setAuthError({
        type: AuthErrorType.REFRESH_TOKEN_FAILED,
        message: "Refresh token is expired.",
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

  // TODO
  // Load user profile
  //
  // 1. check if access token is valid
  // 2. If valid, fetch user profile
  // 3. If not valid, refresh access token
  loadUserProfile: async () => {
    // check if user is authenticated
    if (!get().isAuthenticated()) {
      get().setUserProfileError({
        type: UserProfileErrorType.NOT_AUTHENTICATED,
        message: "User is not authenticated.",
      });
      return false;
    }

    // refresh access token if expired
    if (get().isTokenExpired()) {
      await get().refreshAccessToken();
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
