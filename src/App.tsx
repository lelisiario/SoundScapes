import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import SpotifyProfile from "./Components/SpotifyProfile";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username} // ✅ Ensure `username` is correctly passed as a prop
        onMoodSelect={setSelectedMood}
      />
      {isAuthenticated && <SpotifyProfile token="your_spotify_token_here" setUsername={setUsername} />}
    </div>
  );
};

export default App;
