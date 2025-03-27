import { useEffect, useState } from "react";

const SpotifyProfile = ({ token, setUsername, hideDetails = false }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setUsername(data.display_name); // Pass username to App.tsx
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token, setUsername]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      {!hideDetails && (
        <>
          <p>Email: {profile.email}</p>
          <p>Spotify Profile: <a href={profile.external_urls.spotify}>{profile.display_name}</a></p>
          <p>Subscription: {profile.product}</p>
        </>
      )}
    </div>
  );
};

export default SpotifyProfile;
