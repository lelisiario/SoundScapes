// src/SpotifyAuth.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('In SpotifyAuth callback handler...');
    
    // Handle hash fragment (#access_token=...)
    if (window.location.hash) {
      console.log('Processing hash fragment...');
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get('access_token');
      const errorParam = params.get('error');

      if (errorParam) {
        console.error('Spotify auth error:', errorParam);
        setError(`Authentication error: ${errorParam}`);
        return;
      }

      if (token) {
        console.log('Access token obtained successfully');
        localStorage.setItem('spotifyToken', token);
        navigate('/');
      } else {
        console.error('No token found in callback URL');
        setError('No authentication token received');
      }
    } else {
      console.error('No hash fragment in callback URL');
      setError('Invalid callback response');
    }
  }, [navigate]);

  if (error) {
    return (
      <div>
        <h3>Authentication Error</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Try Again</button>
      </div>
    );
  }

  return <div>Completing authentication, please wait...</div>;
};

export default SpotifyAuth;