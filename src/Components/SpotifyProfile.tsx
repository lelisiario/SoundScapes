import { useState, useEffect } from "react";
import { fetchSpotifyProfile } from "../api";
import { SpotifyUser } from "../types";

interface SpotifyProfileProps {
  token: string;
}

const SpotifyProfile: React.FC<SpotifyProfileProps> = ({ token }) => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetchSpotifyProfile(token)
      .then((data) => {
        if (data) setUser(data);
        else setError("Failed to fetch user data.");
      })
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.display_name}!</h2>
      <p>Email: {user.email}</p>
      <p>
        Spotify Profile:{" "}
        <a href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          {user.external_urls.spotify}
        </a>
      </p>
      <p>Subscription: {user.product}</p>
    </div>
  );
};

export default SpotifyProfile;
