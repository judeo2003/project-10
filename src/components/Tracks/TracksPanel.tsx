import { Component, onMount, onCleanup } from 'solid-js';
import { useTracks } from '../../store/tracks';
import { VolumeIcon, HandIcon, EyeIcon } from './TrackIcons';
import './TracksPanel.css';

interface Instrument {
  id: string;
  name: string;
}

const instruments: Instrument[] = [
  { id: 'piano', name: 'Piano' },
  { id: 'violin', name: 'Violin' },
  { id: 'cello', name: 'Cello' },
  { id: 'flute', name: 'Flute' },
  { id: 'clarinet', name: 'Clarinet' }
];

const TracksPanel: Component = () => {
  const { toggleTracks, trackStates, updateTrackState } = useTracks();
  let isResizing = false;
  let startX = 0;
  let startWidth = 300;
  let panelRef: HTMLDivElement | undefined;

  const handleInstrumentChange = (index: number, value: string) => {
    updateTrackState(index, { selectedInstrument: value });
  };

  const handleVolumeChange = (index: number, value: number) => {
    updateTrackState(index, { volume: value });
  };

  const toggleHand = (index: number) => {
    updateTrackState(index, { 
      isHandOpen: !trackStates()[index].isHandOpen 
    });
  };

  const toggleVisibility = (index: number) => {
    updateTrackState(index, { 
      isVisible: !trackStates()[index].isVisible 
    });
  };

  const startResize = (e: MouseEvent) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = panelRef?.offsetWidth || 300;
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing || !panelRef) return;
    const delta = startX - e.clientX;
    const newWidth = Math.max(200, Math.min(800, startWidth + delta));
    panelRef.style.width = `${newWidth}px`;
  };

  const stopResize = () => {
    isResizing = false;
    if (typeof document !== 'undefined') {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResize);
    }
  });

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResize);
    }
  });

  return (
    <div class="tracks-panel" ref={panelRef}>
      <div 
        class="tracks-resize-handle"
        onMouseDown={startResize}
      />
      <div class="tracks-header">
        <h2>Track Configuration</h2>
        <button class="close-tracks" onClick={toggleTracks}>×</button>
      </div>
      <div class="tracks-content">
        {trackStates().map((track, index) => (
          <div class="track-item">
            <label>Track {index + 1}</label>
            <select
              value={track.selectedInstrument}
              onChange={(e) => handleInstrumentChange(index, e.currentTarget.value)}
            >
              <option value="">Select Instrument</option>
              {instruments.map(instrument => (
                <option value={instrument.id}>{instrument.name}</option>
              ))}
            </select>
            <div class="track-controls">
              <div class="volume-control">
                <VolumeIcon />
                <input
                  type="range"
                  class="volume-slider"
                  min="0"
                  max="100"
                  value={track.volume}
                  onChange={(e) => handleVolumeChange(index, parseInt(e.currentTarget.value))}
                />
              </div>
              <button 
                class={`track-button ${track.isHandOpen ? 'active' : ''}`}
                onClick={() => toggleHand(index)}
                title={track.isHandOpen ? 'Close Hand' : 'Open Hand'}
              >
                <HandIcon />
              </button>
              <button 
                class={`track-button ${track.isVisible ? 'active' : ''}`}
                onClick={() => toggleVisibility(index)}
                title={track.isVisible ? 'Hide Track' : 'Show Track'}
              >
                <EyeIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksPanel;