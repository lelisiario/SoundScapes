import styled from 'styled-components';

// Player Container (slightly larger)
export const PlayerContainer = styled.div`
  height: 100vh; /* Full screen height */
  width: 100vw; /* Full screen width */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,rgb(155, 195, 245),rgb(6, 72, 165));
  color: white;
  box-shadow: none; /* Remove box shadow since it's full screen */
  border-radius: 0; /* Remove rounded corners */
  padding: 20px; /* Add some padding to make it feel larger */
`;

// Track Info (slightly larger text)
export const TrackInfo = styled.div`
  margin-bottom: 30px; /* Increased margin */

  h3 {
    margin: 0;
    font-size: 2rem; /* Increased font size */
    font-weight: bold;
    color: #fff; /* Changed to white for better contrast */
  }

  p {
    margin: 8px 0; /* Increased margin */
    font-size: 1.3rem; /* Increased font size */
    color: #eee; /* Lighter gray for better readability */
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.8rem; /* Adjusted for mobile */
    }

    p {
      font-size: 1.1rem; /* Adjusted for mobile */
    }
  }
`;

// Controls (slightly larger buttons and spacing)
export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px; /* Increased gap between buttons */
  margin-bottom: 30px; /* Increased margin */
`;

// Control Button (modernized with rounded corners, gradients, and hover effects)
interface ControlButtonProps {
  $primary?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  background: ${({ $primary }) =>
    $primary
      ? 'linear-gradient(135deg,rgb(248, 228, 138), #3773c8)' 
      : 'linear-gradient(135deg, #555, #333)'};
  border: none;
  border-radius: 50%; /* Fully rounded buttons */
  width: 65px; /* Increased size */
  height: 65px; /* Increased size */
  color: #fff;
  font-size: 1.6rem; /* Increased font size */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ $primary }) =>
      $primary
        ? 'linear-gradient(135deg, #7bb6f7, #4a8ad4)' /* Lighter blue gradient on hover */
        : 'linear-gradient(135deg, #666, #444)'}; /* Lighter dark gradient on hover */
    transform: scale(1.1); /* Slightly enlarge on hover */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
  }

  &:disabled {
    background: #ccc; /* Grayed out for disabled state */
    cursor: not-allowed;
    transform: none; /* Disable hover effect */
  }

  @media (max-width: 768px) {
    width: 55px; /* Adjusted for mobile */
    height: 55px; /* Adjusted for mobile */
    font-size: 1.4rem; /* Adjusted for mobile */
  }
`;

// Progress Bar Wrapper (slightly larger)
export const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Increased margin */
`;

// Progress Bar (slightly larger and modernized)
export const ProgressBar = styled.input.attrs({ type: 'range' })`
  width: 100%;
  max-width: 85%; /* Slightly wider */
  accent-color: white;
  -webkit-appearance: none;
  background: transparent;

  &::-webkit-slider-thumb {
    appearance: none;
    background: white;
    width: 18px; /* Increased thumb size */
    height: 18px; /* Increased thumb size */
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  }

  &::-webkit-slider-runnable-track {
    height: 8px; /* Increased track height */
    background: rgba(255, 255, 255, 0.8); /* Brighter track */
    border-radius: 5px;
  }
`;