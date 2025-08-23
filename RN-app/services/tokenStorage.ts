import * as SecureStore from "expo-secure-store";

interface TokenData {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRES_AT_KEY = "token_expires_at";

async function saveTokens(tokenData: TokenData): Promise<void> {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokenData.accessToken);

    if (tokenData.refreshToken) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenData.refreshToken);
    }

    const expiresAt = Date.now() + tokenData.expiresIn * 1000;
    await SecureStore.setItemAsync(TOKEN_EXPIRES_AT_KEY, expiresAt.toString());
  } catch (error) {
    console.error("Error saving tokens:", error);
    throw new Error("Failed to save tokens");
  }
}

export async function getAccessToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
    return null;
  }
}

export async function isTokenExpired(): Promise<boolean> {
  try {
    const expiresAt = await SecureStore.getItemAsync(TOKEN_EXPIRES_AT_KEY);
    if (expiresAt) {
      return Date.now() > parseInt(expiresAt, 10);
    }
    return true;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
}

export async function clearTokens(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(TOKEN_EXPIRES_AT_KEY);
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
}

export const tokenStorage = {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  clearTokens,
};
