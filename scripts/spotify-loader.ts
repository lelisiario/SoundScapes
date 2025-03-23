// src/spotify-loader.ts
export async function getSpotifyPlaylists(): Promise<any[]> {
    const token = localStorage.getItem("spotifyToken");
    if (!token) {
      console.error("No Spotify token found");
      return [];
    }
  
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      console.error("Failed to fetch playlists", response.statusText);
      return [];
    }
  
    const data = await response.json();
    return data.items; // Array of user's playlists
  }
  