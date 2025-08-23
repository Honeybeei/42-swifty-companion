import type { UserProfile } from "@/store/authStore";

export async function fetchUserProfile(accessToken: string): Promise<UserProfile> {
  try {
    const response = await fetch("https://api.intra.42.fr/v2/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user profile: ${response.status} ${errorText}`);
    }

    const profile: UserProfile = await response.json();
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}