import { Component, Show, onMount, onCleanup } from 'solid-js';
import { useDebug } from '../../store/debug';
import { createDraggable } from '../../utils/draggable';
import './DebugControls.css';

const DebugControls: Component = () => {
  const { debugState, isDebugVisible, startDebugging, pauseDebugging, stopDebugging } = useDebug();
  let controlsRef: HTMLDivElement | undefined;
  let cleanup: (() => void) | undefined;

  onMount(() => {
    if (controlsRef && typeof window !== 'undefined') {
      const { initDraggable, cleanupDraggable } = createDraggable(controlsRef);
      cleanup = cleanupDraggable;
    }
  });

  onCleanup(() => {
    if (cleanup) cleanup();
  });

  return (
    <Show when={isDebugVisible()}>
      <div 
        class="debug-controls" 
        ref={controlsRef}
      >
        <button 
          class="debug-button" 
          title="Start Debugging"
          onClick={startDebugging}
          disabled={debugState() === 'running'}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 2l8 6-8 6V2z" fill="currentColor"/>
          </svg>
        </button>
        <button 
          class="debug-button" 
          title="Pause"
          onClick={pauseDebugging}
          disabled={debugState() !== 'running'}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M5 2h2v12H5V2zm4 0h2v12H9V2z" fill="currentColor"/>
          </svg>
        </button>
        <button 
          class="debug-button" 
          title="Stop"
          onClick={stopDebugging}
          disabled={debugState() === 'stopped'}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 3h10v10H3V3z" fill="currentColor"/>
          </svg>
        </button>
        <button 
          class="debug-button" 
          title="Step Over"
          disabled={debugState() !== 'paused'}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path 
              d="M2 8h10M9 4l4 4-4 4" 
              stroke="currentColor" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button 
          class="debug-button" 
          title="Step Into"
          disabled={debugState() !== 'paused'}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path 
              d="M8 2v12M4 10l4 4 4-4" 
              stroke="currentColor" 
              stroke-width="1.5" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </Show>
  );
};

export default DebugControls;