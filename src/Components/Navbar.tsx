import React from "react";

interface NavbarProps {
  isAuthenticated: boolean;
  username: string | null;
  onMoodSelect: (mood: string) => void;
  selectedMood: string;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, username, onMoodSelect, selectedMood }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">SoundScapes</h1>
        <div className="mood-selector">
          <label htmlFor="mood">Select Mood:</label>
          <select
            id="mood"
            value={selectedMood}
            onChange={(e) => onMoodSelect(e.target.value)}
            className="mood-dropdown"
          >
            <option value="Happy">Happy</option>
            <option value="Energetic">Energetic</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Sad">Sad</option>
          </select>
        </div>
        <div className="auth-section">
          {isAuthenticated ? (
            <p className="username">Welcome, {username}</p>
          ) : (
            <button className="login-btn">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
