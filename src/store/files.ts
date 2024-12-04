import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export interface SongFile {
  id: string;
  name: string;
  content: string;
  type: 'midi' | 'musicxml';
  lastOpened?: number;
}

const [songs, setSongs] = makePersisted(
  createSignal<SongFile[]>([]),
  { name: 'songs' }
);

const [recentSongs, setRecentSongs] = makePersisted(
  createSignal<SongFile[]>([]),
  { name: 'recentSongs' }
);

export const useFiles = () => {
  const addSong = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const newSong: SongFile = {
            id: crypto.randomUUID(),
            name: file.name,
            content,
            type: file.name.endsWith('.mid') || file.name.endsWith('.midi') 
              ? 'midi' 
              : 'musicxml',
            lastOpened: Date.now()
          };
          setSongs(prev => [...prev, newSong]);
          updateRecentSongs(newSong);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const updateRecentSongs = (song: SongFile) => {
    setRecentSongs(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].sort((a, b) => 
        (b.lastOpened || 0) - (a.lastOpened || 0)
      );
    });
  };

  const removeSong = (id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
    setRecentSongs(prev => prev.filter(song => song.id !== id));
  };

  const openSong = (id: string) => {
    const song = songs().find(s => s.id === id);
    if (song) {
      const updatedSong = { ...song, lastOpened: Date.now() };
      setSongs(prev => prev.map(s => s.id === id ? updatedSong : s));
      updateRecentSongs(updatedSong);
    }
  };

  return {
    songs,
    recentSongs,
    addSong,
    removeSong,
    openSong
  };
};