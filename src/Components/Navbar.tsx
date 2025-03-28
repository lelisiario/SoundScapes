import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean;
  username: string | null;
  onMoodSelect: (mood: string) => void;
  selectedMood: string;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, username, onMoodSelect, selectedMood }) => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      backgroundColor: "#282828",
      color: "white"
    }}>
      <h2 style={{ margin: 0 }}>SoundScapes</h2>
      <div>
        <label htmlFor="mood-select">Select Mood: </label>
        <select
          id="mood-select"
          value={selectedMood}
          onChange={(e) => onMoodSelect(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "#1DB954",
            color: "white",
            border: "none",
            fontSize: "1rem"
          }}
        >
          <option value="Happy">Happy</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Focused">Focused</option>
          <option value="Energetic">Energetic</option>
        </select>
      </div>
      <div>
        {isAuthenticated ? (
          <p>Welcome, {username || "User"}!</p>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
