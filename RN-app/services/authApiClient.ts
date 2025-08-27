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
      let errorData: any = {};
      try {
        const responseText = await response.text();
        if (
          responseText.trim().startsWith("{") ||
          responseText.trim().startsWith("[")
        ) {
          errorData = JSON.parse(responseText);
        } else {
          errorData = {
            message: `Server returned HTML/text response: ${responseText.substring(
              0,
              100
            )}...`,
          };
        }
      } catch (parseError) {
        errorData = {
          message: `Failed to parse server response: ${parseError}`,
        };
      }

      const error = new Error(
        getErrorMessage(response.status, errorData)
      ) as ApiError;
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }

    try {
      const responseText = await response.text();
      if (
        responseText.trim().startsWith("{") ||
        responseText.trim().startsWith("[")
      ) {
        return JSON.parse(responseText);
      } else {
        throw new Error(
          `Server returned non-JSON response: ${responseText.substring(
            0,
            100
          )}...`
        );
      }
    } catch (parseError) {
      throw new Error(`Failed to parse JSON response: ${parseError}`);
    }
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
      let errorData: any = {};
      try {
        const responseText = await response.text();
        if (
          responseText.trim().startsWith("{") ||
          responseText.trim().startsWith("[")
        ) {
          errorData = JSON.parse(responseText);
        } else {
          errorData = {
            message: `Server returned HTML/text response: ${responseText.substring(
              0,
              100
            )}...`,
          };
        }
      } catch (parseError) {
        errorData = {
          message: `Failed to parse server response: ${parseError}`,
        };
      }

      const error = new Error(
        getErrorMessage(response.status, errorData)
      ) as ApiError;
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }

    try {
      const responseText = await response.text();
      if (
        responseText.trim().startsWith("{") ||
        responseText.trim().startsWith("[")
      ) {
        return JSON.parse(responseText);
      } else {
        throw new Error(
          `Server returned non-JSON response: ${responseText.substring(
            0,
            100
          )}...`
        );
      }
    } catch (parseError) {
      throw new Error(`Failed to parse JSON response: ${parseError}`);
    }
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
