import { Component, createSignal, Show } from 'solid-js';
import './FileDialog.css';

interface FileDialogProps {
  onClose: () => void;
  onFileSelect: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

const FileDialog: Component<FileDialogProps> = (props) => {
  const [dragOver, setDragOver] = createSignal(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files) {
      props.onFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      props.onFileSelect(input.files);
    }
  };

  return (
    <div class="file-dialog-overlay" onClick={props.onClose}>
      <div 
        class="file-dialog"
        onClick={(e) => e.stopPropagation()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div class="file-dialog-header">
          <h2>Open File</h2>
          <button class="close-button" onClick={props.onClose}>×</button>
        </div>
        <div class={`file-dialog-content ${dragOver() ? 'drag-over' : ''}`}>
          <div class="file-dialog-message">
            <p>Drop files here or click to select</p>
            <p class="file-types">Supported files: .mid, .midi, .musicxml</p>
          </div>
          <input
            type="file"
            accept={props.accept}
            multiple={props.multiple}
            onChange={handleFileInput}
            class="file-input"
          />
        </div>
      </div>
    </div>
  );
};

export default FileDialog;