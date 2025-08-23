import Env from "@/utils/env";
import * as Linking from "expo-linking";
import { authApiClient } from "./apiClient";
import { tokenStorage } from "./tokenStorage";

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export function extractAuthCodeFromUrl(url: string): string | null {
  try {
    const parsedUrl = Linking.parse(url);
    const code = parsedUrl.queryParams?.code;

    // Ensure code is a string
    if (typeof code !== "string") {
      return null;
    }
    return code;
  } catch (error) {
    console.error("Error extracting auth code from URL:", error);
    return null;
  }
}

export async function exchangeToken(authCode: string): Promise<TokenResponse> {
  try {
    console.log("Exchanging auth code for token:", authCode);

    // Create the request body
    const requestBody = {
      auth_code: authCode,
      client_id: Env.clientId,
    };

    // TODO: Remove this
    console.log("Request body for token exchange:", requestBody);

    const tokenResponse = await authApiClient.post<TokenResponse>(
      "/auth/exchange-token",
      requestBody
    );

    console.log("Token exchange successful:", tokenResponse);

    return tokenResponse;
  } catch (error) {
    console.error("Error exchanging auth code for token:", error);
    throw error; // Rethrow the error for further handling
  }
}

export async function logOut(): Promise<void> {
  try {
    await tokenStorage.clearTokens();
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = await tokenStorage.getAccessToken();
    if (!token) {
      console.log("No access token found, user is not authenticated");
      return false;
    }

    const isExpired = await tokenStorage.isTokenExpired();
    return !isExpired;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    return false;
  }
}

// TODO: Implement fetch user profile
