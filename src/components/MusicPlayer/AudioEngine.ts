import SoundFont from 'soundfont-player';

export class AudioEngine {
  private audioContext: AudioContext;
  private instrument: any;
  private isPlaying: boolean = false;
  private currentNotes: Map<string, any> = new Map();

  constructor() {
    this.audioContext = new AudioContext();
  }

  async init() {
    try {
      this.instrument = await SoundFont.instrument(this.audioContext, 'acoustic_grand_piano');
    } catch (error) {
      console.error('Failed to load instrument:', error);
    }
  }

  playNote(note: string, duration: number) {
    if (!this.instrument || !this.isPlaying) return;

    const noteObj = this.instrument.play(note, this.audioContext.currentTime, { duration });
    this.currentNotes.set(note, noteObj);
  }

  stopNote(note: string) {
    const noteObj = this.currentNotes.get(note);
    if (noteObj) {
      noteObj.stop();
      this.currentNotes.delete(note);
    }
  }

  start() {
    this.isPlaying = true;
    return this.audioContext.resume();
  }

  stop() {
    this.isPlaying = false;
    this.currentNotes.forEach((noteObj, note) => this.stopNote(note));
    return this.audioContext.suspend();
  }

  dispose() {
    this.stop();
    this.currentNotes.clear();
  }
}