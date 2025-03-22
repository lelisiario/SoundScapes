import React, { useState, useRef, useEffect } from 'react';
import { PlayerContainer, TrackInfo, Controls, ControlButton, ProgressBarWrapper } from './AudioPlayerStyles';
import playlistData from './data/playlists.json';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure Bootstrap icons are imported

interface Track {
  name: string;
  url: string;
  duration: number;
  artist: string;
  playlistName: string;
}

// interface Playlist {
//   name: string;
//   artist: string;
//   year: number;
//   tracks: Track[];
// }

// Flatten all tracks from all playlists into a single array
const allTracks: Track[] = playlistData.playlists.flatMap((playlist) =>
  playlist.tracks.map((track) => ({
    ...track,
    artist: playlist.artist,
    playlistName: playlist.name,
  }))
);

const AudioPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = allTracks[currentTrackIndex];

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev < allTracks.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : allTracks.length - 1));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Determine the volume icon dynamically
  const getVolumeIcon = () => {
    if (volume === 0) return "bi-volume-mute"; // Muted
    if (volume < 50) return "bi-volume-down"; // Low volume
    return "bi-volume-up"; // High volume
  };

  // Autoplay when the current track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay failed:', err);
      });
    }
  }, [currentTrackIndex]);

  return (
    <PlayerContainer className="container my-4">
      <audio
        ref={audioRef}
        style={{ display: 'none' }}
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={currentTrack.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <TrackInfo className="text-center my-3">
        <h3>{currentTrack.name}</h3>
        <p>{currentTrack.artist}</p>
        <p>{currentTrack.playlistName}</p>
      </TrackInfo>

      {/* Controls */}
      <Controls>
        <ControlButton onClick={handlePrev}>
          <i className="bi-skip-backward-fill"></i>
        </ControlButton>
        <ControlButton $primary onClick={handlePlay}>
          <i className="bi-play-fill"></i>
        </ControlButton>
        <ControlButton onClick={handlePause}>
          <i className="bi-pause-fill"></i>
        </ControlButton>
        <ControlButton onClick={handleNext}>
          <i className="bi-skip-forward-fill"></i>
        </ControlButton>
      </Controls>

      {/* Volume Control */}
      <ProgressBarWrapper className="my-3">
        <label>
          <i className={`bi ${getVolumeIcon()}`}></i> Volume
        </label>
        <input
          type="range"
          value={volume}
          onChange={handleVolumeChange}
          min="0"
          max="100"
          className="form-range"
        />
      </ProgressBarWrapper>

      {/* Playback Progress Bar */}
      <ProgressBarWrapper className="my-3">
        <label>
          <i className="bi-fast-forward-fill"></i> Progress
        </label>
        <input
          type="range"
          value={currentTime}
          onChange={handleSeek}
          min="0"
          max={audioRef.current?.duration || 0}
          className="form-range"
        />
      </ProgressBarWrapper>
    </PlayerContainer>
  );
};

export default AudioPlayer;