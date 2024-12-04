import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export type DebugState = 'stopped' | 'running' | 'paused';

const [debugState, setDebugState] = makePersisted(
  createSignal<DebugState>('stopped'),
  { name: 'debugState' }
);

const [isDebugVisible, setDebugVisible] = makePersisted(
  createSignal(false),
  { name: 'debugVisible' }
);

export const useDebug = () => {
  const startDebugging = () => setDebugState('running');
  const pauseDebugging = () => setDebugState('paused');
  const stopDebugging = () => setDebugState('stopped');
  
  const showDebugControls = () => setDebugVisible(true);
  const hideDebugControls = () => setDebugVisible(false);

  return {
    debugState,
    isDebugVisible,
    startDebugging,
    pauseDebugging,
    stopDebugging,
    showDebugControls,
    hideDebugControls
  };
};