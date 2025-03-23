import { useEffect, useState, useRef } from "react";
import { getSpotifyPlaylists } from "../scripts/spotify-loader";

const AudioPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function loadTracks() {
      const playlists = await getSpotifyPlaylists();
      if (playlists.length > 0) {
        const firstPlaylistId = playlists[0].id;
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${firstPlaylistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`,
            },
          }
        );
        const data = await response.json();
        setTracks(data.items.map((item: any) => item.track));
      }
    }
    loadTracks();
  }, []);

  const handlePlay = () => {
    if (audioRef.current) audioRef.current.play();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
  };

  return (
    <div>
      {tracks.length > 0 && (
        <>
          <h3>{tracks[currentTrackIndex]?.name}</h3>
          <p>{tracks[currentTrackIndex]?.artists[0]?.name}</p>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handleNext}>Next</button>
          <audio ref={audioRef} src={tracks[currentTrackIndex]?.preview_url} />
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
