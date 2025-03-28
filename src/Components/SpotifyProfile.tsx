import { useState, useEffect } from "react";

// Define a type for the Spotify user profile
interface SpotifyUserProfile {
  display_name: string;
  email: string;
  external_urls: { spotify: string };
  product: string;
}

// Define props for the component
interface SpotifyProfileProps {
  token: string | null;
  setUsername: (username: string) => void;
  hideDetails?: boolean;
}

const SpotifyProfile: React.FC<SpotifyProfileProps> = ({ token, setUsername, hideDetails = false }) => {
  const [profile, setProfile] = useState<SpotifyUserProfile | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: SpotifyUserProfile) => {
        if (data && data.display_name) { // Ensure data is valid before setting state
          setProfile(data);
          setUsername(data.display_name);
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token, setUsername]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      {!hideDetails && profile && ( // Ensure profile exists before accessing properties
        <>
          <p>Email: {profile.email}</p>
          <p>
            Spotify Profile:{" "}
            <a href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              {profile.display_name}
            </a>
          </p>
          <p>Subscription: {profile.product}</p>
        </>
      )}
    </div>
  );
};

export default SpotifyProfile;
