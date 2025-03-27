import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SpotifyAuth from "./SpotifyAuth";
import AudioPlayer from "./AudioPlayer";
import Navbar from "./Components/Navbar"; 
import SpotifyProfile from "./Components/SpotifyProfile"; // Import the profile component
import "./NavbarStyles.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null); // Store username for navbar

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyToken");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} username={username} onMoodSelect={setCurrentMood} />}
        
        <Routes>
          <Route path="/callback" element={<SpotifyAuth />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <div className="content-container">
                  {currentMood && (
                    <div className="mood-banner">
                      <h2>Current Mood: {currentMood}</h2>
                    </div>
                  )}
                  <AudioPlayer />
                  <SpotifyProfile token={token} setUsername={setUsername} hideDetails /> {/* Only set username */}
                </div>
              ) : (
                <div className="login-page">
                  <h1>Welcome to Soundscapes</h1>
                  <p>Discover music that matches your mood</p>
                  <button className="login-spotify-btn" onClick={() => window.location.href = "SPOTIFY_AUTH_URL"}>
                    <i className="bi bi-spotify"></i> Connect with Spotify
                  </button>
                </div>
              )
            }
          />
          <Route path="/search" element={isAuthenticated ? <div>Search Page (Coming Soon)</div> : <Navigate to="/" />} />
          <Route path="/library" element={isAuthenticated ? <div>Your Library (Coming Soon)</div> : <Navigate to="/" />} />
          <Route path="/dashboard" element={isAuthenticated ? <div>Dashboard (Coming Soon)</div> : <Navigate to="/" />} />
          <Route path="/settings" element={isAuthenticated ? <div>Settings (Coming Soon)</div> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
