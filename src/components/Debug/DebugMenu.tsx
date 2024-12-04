import { Component, Show } from 'solid-js';
import { useDebug } from '../../store/debug';
import './DebugMenu.css';

const DebugMenu: Component = () => {
  const { debugState, isDebugVisible, startDebugging, pauseDebugging, stopDebugging } = useDebug();

  return (
    <Show when={isDebugVisible()}>
      <div class="debug-menu">
        <div class="debug-menu-group">
          <button 
            class="debug-menu-item" 
            onClick={startDebugging}
            disabled={debugState() === 'running'}
          >
            Start Debugging
          </button>
          <button 
            class="debug-menu-item" 
            onClick={pauseDebugging}
            disabled={debugState() !== 'running'}
          >
            Pause
          </button>
          <button 
            class="debug-menu-item" 
            onClick={stopDebugging}
            disabled={debugState() === 'stopped'}
          >
            Stop
          </button>
        </div>
      </div>
    </Show>
  );
};

export default DebugMenu;