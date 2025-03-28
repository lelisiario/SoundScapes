import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  username: string | null;
  onMoodSelect: (mood: string) => void;
  selectedMood: string; // Made required since it's a core feature
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, username, onMoodSelect, selectedMood }) => {
  // State hooks
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [localUsername, setLocalUsername] = useState<string | null>(username);

  // Moods available for selection
  const moods = ['Happy', 'Energetic', 'Chill', 'Sad', 'Focused', 'Romantic', 'Party'];

  useEffect(() => {
    // Fetch user profile if authenticated
    if (isAuthenticated) {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('spotifyToken');
          if (!token) return;
          
          const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setLocalUsername(data.display_name || data.id);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">SoundScapes</Link>

        <div className="mood-selector">
          <label htmlFor="mood">Select Mood:</label>
          <select
            id="mood"
            value={selectedMood}
            onChange={(e) => onMoodSelect(e.target.value)}
          >
            {moods.map((mood) => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        {isAuthenticated ? (
          <div className="user-menu">
            <button onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              {localUsername || "User"}
            </button>
            {userDropdownOpen && (
              <div className="dropdown">
                <button onClick={() => console.log("Logout")}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;