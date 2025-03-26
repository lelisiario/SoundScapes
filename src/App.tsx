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
  const [token, setToken] = useState<string | null>(null); // Store token for API calls

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyToken");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken); // Set token for API use
    }
    setIsLoading(false);
  }, []);

  const handleMoodSelect = (mood: string) => {
    console.log(`Selected mood: ${mood}`);
    setCurrentMood(mood);
  };

  const handleRedirectToAuth = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost:5173/callback");
    const scopes = encodeURIComponent(
      "user-read-private user-read-email user-library-modify playlist-modify-public playlist-modify-private"
    );
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
    window.location.href = authUrl;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} onMoodSelect={handleMoodSelect} />}
        
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
                  {token && <SpotifyProfile token={token} />} {/* Show profile when authenticated */}
                </div>
              ) : (
                <div className="login-page">
                  <h1>Welcome to Soundscapes</h1>
                  <p>Discover music that matches your mood</p>
                  <button className="login-spotify-btn" onClick={handleRedirectToAuth}>
                    <i className="bi bi-spotify"></i> Connect with Spotify
                  </button>
                </div>
              )
            }
          />
          <Route path="/search" element={isAuthenticated ? <div>Search Page (Coming Soon)</div> : <Navigate to="/" />} />
          <Route path="/library" element={isAuthenticated ? <div>Your Library (Coming Soon)</div> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <div>User Profile (Coming Soon)</div> : <Navigate to="/" />} />
          <Route path="/settings" element={isAuthenticated ? <div>Settings (Coming Soon)</div> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
