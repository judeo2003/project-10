import { Component, onMount, onCleanup } from 'solid-js';
import { useWidgets } from '../../store/widgets';
import './WidgetsPanel.css';

const WidgetsPanel: Component = () => {
  const { toggleWidgets } = useWidgets();
  let isResizing = false;
  let startX = 0;
  let startWidth = 300;
  let panelRef: HTMLDivElement | undefined;

  const startResize = (e: MouseEvent) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = panelRef?.offsetWidth || 300;
    if (typeof document !== 'undefined') {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing || !panelRef) return;
    const delta = startX - e.clientX;
    const newWidth = Math.max(200, Math.min(800, startWidth + delta));
    panelRef.style.width = `${newWidth}px`;
  };

  const stopResize = () => {
    isResizing = false;
    if (typeof document !== 'undefined') {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResize);
    }
  });

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResize);
    }
  });

  return (
    <div class="widgets-panel" ref={panelRef}>
      <div 
        class="widgets-resize-handle"
        onMouseDown={startResize}
      />
      <div class="widgets-header">
        <h2>Widget Configuration</h2>
        <button class="close-widgets" onClick={toggleWidgets}>×</button>
      </div>
      <div class="widgets-content">
        {/* Empty content for now */}
      </div>
    </div>
  );
};

export default WidgetsPanel;