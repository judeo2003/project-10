import { Component, createSignal, Show } from 'solid-js';
import { useEvents } from '../../store/events';
import { useFiles } from '../../store/files';
import FileDialog from '../FileDialog/FileDialog';
import './Titlebar.css';

const Titlebar: Component = () => {
  const { emit } = useEvents();
  const { addSong } = useFiles();
  const [showFileMenu, setShowFileMenu] = createSignal(false);
  const [showTerminalMenu, setShowTerminalMenu] = createSignal(false);
  const [showFileDialog, setShowFileDialog] = createSignal(false);

  const handleFileSelect = async (files: FileList) => {
    for (const file of Array.from(files)) {
      if (file.name.endsWith('.mid') || 
          file.name.endsWith('.midi') || 
          file.name.endsWith('.musicxml')) {
        await addSong(file);
      }
    }
    setShowFileDialog(false);
  };

  const handleOpenFile = () => {
    if (typeof window !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.mid,.midi,.musicxml';
      input.multiple = true;
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) handleFileSelect(files);
      };
      input.click();
    }
  };

  return (
    <>
      <div class="titlebar">
        <div class="titlebar-menu">
          <div 
            class="menu-item" 
            onClick={() => handleOpenFile()}
          >
            File
          </div>
          <div class="menu-item">Edit</div>
          <div class="menu-item">View</div>
          <div 
            class="menu-item"
            onClick={() => emit('add-terminal')}
          >
            Terminal
          </div>
          <div class="menu-item">Help</div>
        </div>
        <div class="window-title">Solid Code</div>
      </div>
      <Show when={showFileDialog()}>
        <FileDialog
          onClose={() => setShowFileDialog(false)}
          onFileSelect={handleFileSelect}
          accept=".mid,.midi,.musicxml"
          multiple={true}
        />
      </Show>
    </>
  );
};

export default Titlebar;