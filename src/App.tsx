import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SpotifyProfile from "./Components/SpotifyProfile";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_token"); // 🔹 Retrieve stored token
    if (token) {
      setIsAuthenticated(true); // ✅ Now `setIsAuthenticated` is used
    }
  }, []);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        onMoodSelect={setSelectedMood}
      />
      <p>Selected Mood: {selectedMood}</p>
      {isAuthenticated && <SpotifyProfile token="your_spotify_token_here" setUsername={setUsername} />}
    </div>
  );
};

export default App;
