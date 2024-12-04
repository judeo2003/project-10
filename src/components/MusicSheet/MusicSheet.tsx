import { Component, onMount, onCleanup } from 'solid-js';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import './MusicSheet.css';

const MusicSheet: Component = () => {
  let divRef: HTMLDivElement | undefined;
  let osmd: OpenSheetMusicDisplay | undefined;

  // Sample MusicXML data
  const sampleMusicXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work>
    <work-title>C Major Scale</work-title>
  </work>
  <identification>
    <creator type="composer">Example</creator>
  </identification>
  <part-list>
    <score-part id="P1">
      <part-name>Piano</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>F</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
    </measure>
    <measure number="2">
      <note>
        <pitch>
          <step>G</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>A</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>B</step>
          <octave>4</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
      <note>
        <pitch>
          <step>C</step>
          <octave>5</octave>
        </pitch>
        <duration>1</duration>
        <type>quarter</type>
      </note>
    </measure>
  </part>
</score-partwise>`;

  const initializeOSMD = async () => {
    if (!divRef || typeof window === 'undefined') return;

    try {
      osmd = new OpenSheetMusicDisplay(divRef, {
        autoResize: true,
        drawTitle: true,
        drawSubtitle: true,
        drawComposer: true,
        drawLyricist: true,
        darkMode: true,
        backend: 'svg',
        drawingParameters: {
          defaultColorMusic: "#d4d4d4",
          defaultColorLabel: "#cccccc",
          defaultFontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
        }
      });

      await osmd.load(sampleMusicXML);
      await osmd.render();
    } catch (error) {
      console.error('Error initializing OSMD:', error);
    }
  };

  onMount(() => {
    setTimeout(initializeOSMD, 100);
  });

  onCleanup(() => {
    if (osmd) {
      osmd.clear();
    }
  });

  return (
    <div class="music-sheet-container">
      <div class="music-sheet" ref={divRef}></div>
      <MusicPlayer musicXML={sampleMusicXML} />
    </div>
  );
};

export default MusicSheet;