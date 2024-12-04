import { Component, createSignal, onMount } from 'solid-js';
import { MaximizeIcon, MinimizeIcon, CloseIcon, AddTerminalIcon } from './TerminalIcons';
import { useEvents } from '../../store/events';
import './Terminal.css';

interface TerminalProps {
  terminalId: string;
  isMaximized: boolean;
  onClose: () => void;
  onMaximize: () => void;
}

const Terminal: Component<TerminalProps> = (props) => {
  const [commandHistory, setCommandHistory] = createSignal<string[]>([]);
  const [currentCommand, setCurrentCommand] = createSignal('');
  const [showDropdown, setShowDropdown] = createSignal(false);
  const { emit } = useEvents();
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    if (inputRef) {
      inputRef.focus();
    }
  });

  const handleCommand = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand()) {
      setCommandHistory([...commandHistory(), `$ ${currentCommand()}`]);
      setCurrentCommand('');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown());
  };

  return (
    <div class="terminal" style={{ height: props.isMaximized ? '100%' : '200px' }}>
      <div class="terminal-header">
        <div class="terminal-title">
          <div class="terminal-dropdown">
            <button class="terminal-action" onClick={toggleDropdown}>
              <AddTerminalIcon />
            </button>
            <div class={`terminal-dropdown-content ${showDropdown() ? 'show' : ''}`}>
              <div class="terminal-dropdown-item" onClick={() => emit('add-terminal')}>
                New Terminal
              </div>
              <div class="terminal-dropdown-item" onClick={() => emit('split-terminal')}>
                Split Terminal
              </div>
            </div>
          </div>
          Terminal {props.terminalId}
        </div>
        <div class="terminal-actions">
          <button class="terminal-action" onClick={props.onMaximize} title={props.isMaximized ? 'Restore' : 'Maximize'}>
            {props.isMaximized ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
          <button class="terminal-action" onClick={props.onClose} title="Close">
            <CloseIcon />
          </button>
        </div>
      </div>
      <div class="terminal-content">
        {commandHistory().map((cmd) => (
          <div>{cmd}</div>
        ))}
        <div class="terminal-input">
          <span class="terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            class="terminal-input-field"
            value={currentCommand()}
            onInput={(e) => setCurrentCommand(e.currentTarget.value)}
            onKeyDown={handleCommand}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;