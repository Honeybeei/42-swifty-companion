import { exchangeToken, extractAuthCodeFromUrl } from "@/services/authService";
import { fetchUserProfile } from "@/services/profileService";
import { tokenStorage } from "@/services/tokenStorage";
import { create } from "zustand";

export interface UserProfile {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string;
  url: string;
  phone: string | null;
  displayname: string;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  staff?: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string | null;
  alumni?: boolean;
  active?: boolean;
  campus: {
    id: number;
    name: string;
    time_zone: string;
    language: {
      id: number;
      name: string;
      identifier: string;
      created_at: string;
      updated_at: string;
    };
    users_count: number;
    vogsphere_id: number;
  }[];
  cursus_users: {
    id: number;
    begin_at: string;
    end_at: string | null;
    grade: string | null;
    level: number;
    skills: any[];
    cursus_id: number;
    has_coalition: boolean;
    cursus: {
      id: number;
      created_at: string;
      name: string;
      slug: string;
    };
  }[];
}

interface AuthState {
  isAuthenticated: boolean;
  authError: string | null;
  profileError: string | null;
  userProfile: UserProfile | null;
  setIsAuthenticated: (value: boolean) => void;
  setAuthError: (error: string | null) => void;
  setProfileError: (error: string | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  signInWith42: (url: string) => Promise<void>;
  loadUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  authError: null,
  profileError: null,
  userProfile: null,

  // Actions
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setProfileError: (error) => {
    set({ profileError: error });
    if (error) {
      console.error("Profile Error:", error);
    }
  },
  setAuthError: (error) => {
    set({ authError: error });
    if (error) {
      console.error("Auth Error:", error);
    }
  },
  signInWith42: async (url: string) => {
    get().setIsAuthenticated(false);
    get().setAuthError(null);
    try {
      console.log("Received URL:", url);

      const authCode = extractAuthCodeFromUrl(url);
      if (!authCode) {
        throw new Error("No auth code found in URL");
      }

      const tokenResponse = await exchangeToken(authCode);
      console.log("Token response:", tokenResponse);

      tokenStorage.saveTokens({
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        expiresIn: tokenResponse.expires_in,
        tokenType: tokenResponse.token_type,
      });

      get().setIsAuthenticated(true);
    } catch (err) {
      console.error("Error during auth callback:", err);
      get().setAuthError("Failed to authenticate. Please try again.");
    }
  },

  loadUserProfile: async () => {
    get().setProfileError(null);
    try {
      const accessToken = await tokenStorage.getAccessToken();
      if (!accessToken) {
        throw new Error("No access token available");
      }

      const userProfile = await fetchUserProfile(accessToken);
      get().setUserProfile(userProfile);
      console.log("User profile loaded successfully");
    } catch (error) {
      console.error("Error loading user profile:", error);
      get().setProfileError("Failed to load profile data. Please try refreshing.");
    }
  },

  signOut: async () => {
    try {
      await tokenStorage.clearTokens();
      set({ isAuthenticated: false, authError: null, profileError: null, userProfile: null });
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      set({ authError: "Failed to log out. Please try again." });
    }
  },
}));
