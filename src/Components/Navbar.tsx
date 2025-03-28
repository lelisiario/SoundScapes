import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  username: string | null;
  onMoodSelect: (mood: string) => void;
}

const Navbar = ({ isAuthenticated, onMoodSelect }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Moods available for selection
  const moods = [
    'Happy', 
    'Energetic', 
    'Chill', 
    'Sad', 
    'Focused', 
    'Romantic', 
    'Party'
  ];

  useEffect(() => {
    // Fetch user profile if authenticated
    if (isAuthenticated) {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('spotifyToken');
          const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUsername(data.display_name || data.id);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('spotifyToken');
    window.location.href = '/'; // Refresh the page to trigger re-auth
  };

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = encodeURIComponent('http://localhost:5173/callback');
    const scopes = encodeURIComponent('user-read-private user-read-email user-library-modify playlist-modify-public playlist-modify-private');
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
    window.location.href = authUrl;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <i className="bi bi-music-note-beamed"></i> Soundscapes
          </Link>
        </div>

        <div className="navbar-links">
          {/* Mood Selector Dropdown */}
          <div className="dropdown">
            <button 
              className="dropdown-toggle" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <i className="bi bi-emoji-smile"></i> Mood
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {moods.map(mood => (
                  <button 
                    key={mood} 
                    className="dropdown-item"
                    onClick={() => {
                      onMoodSelect(mood);
                      setDropdownOpen(false);
                    }}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Link */}
          <Link to="/search" className="nav-link">
            <i className="bi bi-search"></i> Search
          </Link>

          {/* Library Link (only visible when authenticated) */}
          {isAuthenticated && (
            <Link to="/library" className="nav-link">
              <i className="bi bi-collection"></i> Library
            </Link>
          )}

          {/* User Profile / Auth */}
          <div className="user-dropdown">
            {isAuthenticated ? (
              <>
                <button 
                  className="dropdown-toggle user-button" 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                >
                  <i className="bi bi-person-circle"></i> 
                  {username || 'User'}
                </button>
                {userDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to="/settings" className="dropdown-item">Settings</Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button className="login-button" onClick={handleLogin}>
                <i className="bi bi-spotify"></i> Login with Spotify
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;