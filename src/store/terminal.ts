import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export interface Terminal {
  id: string;
  isMaximized: boolean;
}

const [terminals, setTerminals] = makePersisted(
  createSignal<Terminal[]>([{ id: '1', isMaximized: false }]),
  { name: 'terminals' }
);

export const useTerminal = () => {
  const addTerminal = () => {
    setTerminals(prev => [...prev, { 
      id: `${prev.length + 1}`,
      isMaximized: false 
    }]);
  };

  const removeTerminal = (id: string) => {
    setTerminals(prev => prev.filter(t => t.id !== id));
  };

  const toggleMaximize = (id: string) => {
    setTerminals(prev => prev.map(t => 
      t.id === id ? { ...t, isMaximized: !t.isMaximized } : t
    ));
  };

  return {
    terminals,
    addTerminal,
    removeTerminal,
    toggleMaximize
  };
};