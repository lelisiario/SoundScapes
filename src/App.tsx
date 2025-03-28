import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import SpotifyProfile from "./Components/SpotifyProfile";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("Happy"); 

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="app-container"> {/* ✅ Ensures full-height styling */}
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        onMoodSelect={setSelectedMood}
        selectedMood={selectedMood}
      />
      <div className="content-container">
        <p>Selected Mood: {selectedMood}</p>
        {isAuthenticated && <SpotifyProfile token="your_spotify_token_here" setUsername={setUsername} />}
      </div>
    </div>
  );
};

export default App;

