// src/SpotifyAuth.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("In SpotifyAuth callback handler...");
    console.log("Current URL:", window.location.href);

    let token: string | null = null;
    let errorParam: string | null = null;

    // Check both hash and query parameters
    if (window.location.hash) {
      console.log("Processing hash fragment...");
      console.log("Callback URL:", window.location.href);
      const params = new URLSearchParams(window.location.hash.substring(1));
      token = params.get("access_token");
      errorParam = params.get("error");
    } else if (window.location.search) {
      console.log("Processing query parameters...");
      const params = new URLSearchParams(window.location.search);
      token = params.get("access_token");
      errorParam = params.get("error");
    }

    if (errorParam) {
      console.error("Spotify auth error:", errorParam);
      setError(`Authentication error: ${errorParam}`);
      return;
    }

    if (token) {
      console.log("Access token obtained successfully:", token);
      localStorage.setItem("spotifyToken", token);

      // Remove token from URL
      window.history.replaceState(null, "", "/");

      navigate("/");
    } else {
      console.error("No token found in callback URL");
      setError("No authentication token received");
    }
  }, [navigate]);

  if (error) {
    return (
      <div>
        <h3>Authentication Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Try Again</button>
      </div>
    );
  }

  return <div>Completing authentication, please wait...</div>;
};

export default SpotifyAuth;
