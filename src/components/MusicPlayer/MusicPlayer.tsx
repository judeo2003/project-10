import { Component, createSignal, onMount, onCleanup } from 'solid-js';
import { AudioEngine } from './AudioEngine';
import './MusicPlayer.css';

interface MusicPlayerProps {
  musicXML: string;
}

const MusicPlayer: Component<MusicPlayerProps> = (props) => {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  let audioEngine: AudioEngine;
  let playbackInterval: number;
  
  onMount(async () => {
    audioEngine = new AudioEngine();
    await audioEngine.init();
    
    // Parse MusicXML and calculate duration
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(props.musicXML, "text/xml");
    const notes = xmlDoc.getElementsByTagName("note");
    
    let totalDuration = 0;
    Array.from(notes).forEach(note => {
      const duration = parseInt(note.getElementsByTagName("duration")[0]?.textContent || "0");
      totalDuration += duration;
    });
    setDuration(totalDuration);
  });

  onCleanup(() => {
    if (audioEngine) {
      audioEngine.dispose();
    }
    if (playbackInterval) {
      clearInterval(playbackInterval);
    }
  });

  const togglePlay = async () => {
    if (!isPlaying()) {
      await audioEngine.start();
      setIsPlaying(true);
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(props.musicXML, "text/xml");
      const notes = xmlDoc.getElementsByTagName("note");
      
      let time = 0;
      Array.from(notes).forEach((note, index) => {
        const pitch = note.getElementsByTagName("pitch")[0];
        if (pitch) {
          const step = pitch.getElementsByTagName("step")[0].textContent;
          const octave = pitch.getElementsByTagName("octave")[0].textContent;
          const duration = parseInt(note.getElementsByTagName("duration")[0].textContent || "0");
          
          setTimeout(() => {
            audioEngine.playNote(`${step}${octave}`, duration * 0.5);
          }, time * 500);
          
          time += duration;
        }
      });

      // Update progress
      playbackInterval = setInterval(() => {
        if (currentTime() < duration()) {
          setCurrentTime(prev => prev + 1);
        } else {
          clearInterval(playbackInterval);
          setIsPlaying(false);
          setCurrentTime(0);
          audioEngine.stop();
        }
      }, 500);
    } else {
      setIsPlaying(false);
      audioEngine.stop();
      clearInterval(playbackInterval);
      setCurrentTime(0);
    }
  };

  return (
    <div class="music-player">
      <div class="controls">
        <button 
          class="play-button" 
          onClick={togglePlay}
          title={isPlaying() ? 'Stop' : 'Play'}
        >
          {isPlaying() ? '⏹' : '▶'}
        </button>
        <div class="progress-bar">
          <div 
            class="progress" 
            style={{ width: `${(currentTime() / duration()) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;