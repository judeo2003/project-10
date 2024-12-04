import { Component, For } from 'solid-js';
import Terminal from './Terminal';
import DebugControls from '../Debug/DebugControls';
import { useTerminal } from '../../store/terminal';
import { useEvents } from '../../store/events';
import './Terminal.css';

const TerminalManager: Component = () => {
  const { terminals, addTerminal, removeTerminal, toggleMaximize } = useTerminal();
  const { subscribe } = useEvents();

  // Subscribe to terminal events
  subscribe('add-terminal', addTerminal);
  subscribe('remove-terminal', removeTerminal);
  subscribe('split-terminal', addTerminal);

  return (
    <div class="terminal-container">
      <For each={terminals()}>
        {(terminal) => (
          <Terminal
            terminalId={terminal.id}
            isMaximized={terminal.isMaximized}
            onClose={() => removeTerminal(terminal.id)}
            onMaximize={() => toggleMaximize(terminal.id)}
          />
        )}
      </For>
      <DebugControls />
    </div>
  );
};

export default TerminalManager;