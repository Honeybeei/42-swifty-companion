import { exchangeToken, extractAuthCodeFromUrl } from "@/services/authService";
import { tokenStorage } from "@/services/tokenStorage";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  authError: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setAuthError: (error: string | null) => void;
  signInWith42: (url: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  authError: null,

  // Actions
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
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

  signOut: async () => {
    try {
      await tokenStorage.clearTokens();
      set({ isAuthenticated: false, authError: null });
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      set({ authError: "Failed to log out. Please try again." });
    }
  },
}));
