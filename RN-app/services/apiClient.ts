import Env from "@/utils/env";

interface ApiError extends Error {
  status?: number;
  code?: string;
}

function getErrorMessage(status: number, errorData: any): string {
  switch (status) {
    case 400:
      return "Bad Request: The server could not understand the request.";
    case 401:
      return "Unauthorized: Access is denied due to invalid credentials.";
    case 404:
      return "Not Found: The requested resource could not be found.";
    case 500:
      return "Internal Server Error: The server encountered an error.";
    default:
      return errorData.message || "An unknown error occurred.";
  }
}

async function post<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`${Env.serverUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(
        getErrorMessage(response.status, errorData)
      ) as ApiError;
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API request:", error);
    if (
      error instanceof TypeError &&
      error.message.includes("Network request failed")
    ) {
      throw new Error("Network error: Please check your connection.");
    }
    throw error;
  }
}

export async function get<T>(
  endpoint: string,
  accessToken: string
): Promise<T> {
  try {
    const response = await fetch(`${Env.serverUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(
        getErrorMessage(response.status, errorData)
      ) as ApiError;
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API request:", error);
    if (
      error instanceof TypeError &&
      error.message.includes("Network request failed")
    ) {
      throw new Error("Network error: Please check your connection.");
    }
    throw error;
  }
}

export const authApiClient = {
  post,
  get,
};
