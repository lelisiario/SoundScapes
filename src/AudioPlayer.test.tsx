import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';
import playlistData from './data/playlists.json';

test('AudioPlayer cycles through all tracks from the JSON playlist', async () => {
  // Get the expected number of tracks from the first playlist
  const expectedTrackCount = playlistData.playlists[0].tracks.length;
  
  // Render the AudioPlayer component
  render(<AudioPlayer />);
  
  // Assume the current track's name is rendered in an h3 element
  const getCurrentTrackName = () => screen.getByRole('heading', { level: 3 }).textContent;
  
  // Save the initial track name
  const initialTrackName = getCurrentTrackName();
  
  // Find the "next" button (assuming it displays '>>')
  const nextButton = screen.getByText('>>');
  
  // Count the number of distinct track changes until we cycle back to the first track
  let distinctTrackCount = 0;
  let currentTrackName = initialTrackName;
  
  // Click the next button until we see the initial track name again
  // Prevent an infinite loop by iterating at most expectedTrackCount + 1 times.
  for (let i = 0; i < expectedTrackCount + 1; i++) {
    fireEvent.click(nextButton);
    
    // Wait for the track change (if necessary, use waitFor)
    await waitFor(() => {
      expect(getCurrentTrackName()).not.toBeNull();
    });
    
    const newTrackName = getCurrentTrackName();
    if (newTrackName !== currentTrackName) {
      distinctTrackCount++;
      currentTrackName = newTrackName;
    }
    
    // If we've cycled back to the initial track, break out of the loop
    if (newTrackName === initialTrackName) {
      break;
    }
  }
  
  // The number of distinct tracks encountered should equal the number of tracks in the JSON file.
  expect(distinctTrackCount).toBe(expectedTrackCount);
});
