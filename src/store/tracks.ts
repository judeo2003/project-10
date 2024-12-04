import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export interface TrackState {
  volume: number;
  isHandOpen: boolean;
  isVisible: boolean;
  selectedInstrument: string;
}

const [isTracksVisible, setTracksVisible] = makePersisted(
  createSignal(false),
  { name: 'tracksVisible' }
);

const [trackStates, setTrackStates] = makePersisted(
  createSignal<TrackState[]>(
    Array(5).fill(null).map(() => ({
      volume: 75,
      isHandOpen: true,
      isVisible: true,
      selectedInstrument: ''
    }))
  ),
  { name: 'trackStates' }
);

export const useTracks = () => {
  const toggleTracks = () => setTracksVisible(prev => !prev);
  const hideTracks = () => setTracksVisible(false);
  const showTracks = () => setTracksVisible(true);

  const updateTrackState = (index: number, updates: Partial<TrackState>) => {
    setTrackStates(prev => {
      const newStates = [...prev];
      newStates[index] = { ...newStates[index], ...updates };
      return newStates;
    });
  };

  return {
    isTracksVisible,
    trackStates,
    toggleTracks,
    hideTracks,
    showTracks,
    updateTrackState
  };
};