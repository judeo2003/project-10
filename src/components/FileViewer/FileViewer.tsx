import { Component } from 'solid-js';
import './FileViewer.css';

interface FileViewerProps {
  filename: string;
  content: string;
}

const FileViewer: Component<FileViewerProps> = (props) => {
  // Generate more content to ensure scrolling
  const enhancedContent = props.content + Array(100)
    .fill(null)
    .map((_, i) => `\n// Additional line ${i + 1} for demonstration\nfunction demo${i}() {\n  return 'test';\n}`)
    .join('\n');

  return (
    <div class="file-viewer">
      <pre class="file-content">
        <code>{enhancedContent}</code>
      </pre>
    </div>
  );
}

export default FileViewer;