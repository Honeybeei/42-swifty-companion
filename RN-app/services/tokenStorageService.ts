import { AuthToken } from "@/types";
import * as SecureStore from "expo-secure-store";

// This service only handles saving and retrieving tokens from secure storage.

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const CREATED_AT_KEY = "created_at";

async function saveTokens(tokenData: AuthToken): Promise<void> {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokenData.accessToken);

    if (tokenData.refreshToken) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenData.refreshToken);
    }

    await SecureStore.setItemAsync(
      CREATED_AT_KEY,
      tokenData.createdAt.toString()
    );
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

export async function getTokenCreationTime(): Promise<number | null> {
  try {
    const createdAtStr = await SecureStore.getItemAsync(CREATED_AT_KEY);
    return createdAtStr ? parseInt(createdAtStr, 10) : null;
  } catch (error) {
    console.error("Error retrieving token creation time:", error);
    return null;
  }
}

export async function clear(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(CREATED_AT_KEY);
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
}

export const tokenStorage = {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  getTokenCreationTime,
  clear,
};
