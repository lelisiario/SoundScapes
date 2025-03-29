import styled from 'styled-components';

export const PlayerContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  box-shadow: none;
  border-radius: 0;
  padding: 20px;
`;

// Track Info
export const TrackInfo = styled.div`
  margin-bottom: 30px;

  h3 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
  }

  p {
    margin: 8px 0;
    font-size: 1.3rem;
    color: #eee;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
`;

// Controls
export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
`;

interface ControlButtonProps {
  $primary?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  background: ${({ $primary }) =>
    $primary
      ? 'linear-gradient(135deg, #1db954, #1ed760)'
      : 'linear-gradient(135deg, #555, #333)'};
  border: none;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ $primary }) =>
      $primary
        ? 'linear-gradient(135deg, #1ed760, #1db954)'
        : 'linear-gradient(135deg, #666, #444)'};
    transform: scale(1.1);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 1.4rem;
  }
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ProgressBar = styled.input.attrs({ type: 'range' })`
  width: 100%;
  max-width: 85%;
  accent-color: white;
  -webkit-appearance: none;
  background: transparent;

  &::-webkit-slider-thumb {
    appearance: none;
    background: white;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
`;
