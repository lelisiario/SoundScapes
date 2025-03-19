// src/SpotifyAuth.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the access token from the URL hash
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const token = params.get('access_token');

    if (token) {
      // Save the token to localStorage
      localStorage.setItem('spotifyToken', token);
      // Redirect to the home page
      navigate('/');
    } else if (!localStorage.getItem('spotifyToken')) {
      // Redirect to Spotify's login page if no token is found
      const clientId = 'YOUR_CLIENT_ID'; // Replace with your Client ID
      const redirectUri = encodeURIComponent('http://localhost:5173/callback');
      const scopes = encodeURIComponent('user-read-private user-read-email user-library-modify');
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
      window.location.href = authUrl;
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default SpotifyAuth;