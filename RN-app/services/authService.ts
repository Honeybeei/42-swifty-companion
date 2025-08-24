import { AuthToken } from "@/types";
import Env from "@/utils/env";
import * as Linking from "expo-linking";
import { authApiClient } from "./apiClient";

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

interface TokenExchangeResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export async function exchangeToken(authCode: string): Promise<AuthToken> {
  try {
    console.log("Exchanging auth code for token:", authCode);

    // Create the request body
    const requestBody = {
      auth_code: authCode,
      client_id: Env.clientId,
    };

    const tokenResponse = await authApiClient.post<TokenExchangeResponse>(
      "/auth/exchange-token",
      requestBody
    );

    console.log("Token exchange successful:", tokenResponse);

    return {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresIn: tokenResponse.expires_in,
      tokenType: tokenResponse.token_type,
      createdAt: Date.now(),
    };
  } catch (error) {
    console.error("Error exchanging auth code for token:", error);
    throw error; // Rethrow the error for further handling
  }
}

export async function getNewAccessToken(
  refreshToken: string
): Promise<AuthToken> {
  try {
    const requestBody = {
      refresh_token: refreshToken,
      client_id: Env.clientId,
    };

    const tokenResponse = await authApiClient.post<TokenExchangeResponse>(
      "/auth/refresh-token",
      requestBody
    );

    return {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresIn: tokenResponse.expires_in,
      tokenType: tokenResponse.token_type,
      createdAt: Date.now(),
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}
