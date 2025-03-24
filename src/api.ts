import { SpotifyUser } from "./types";

export async function fetchSpotifyProfile(token: string): Promise<SpotifyUser | null> {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json(); // Returns data with the SpotifyUser type
  } catch (error) {
    console.error("Failed to fetch Spotify profile:", error);
    return null;
  }
}
