import { Component, onMount, onCleanup } from 'solid-js';
import { useMainWidget } from '../../../store/mainWidget';
import { VolumeIcon, HandIcon, EyeIcon } from '../../Tracks/TrackIcons';
import './MainWidget.css';

interface Widget {
  id: string;
  name: string;
}

const widgets: Widget[] = [
  { id: 'piano', name: 'Piano' },
  { id: 'violin', name: 'Violin' },
  { id: 'cello', name: 'Cello' },
  { id: 'flute', name: 'Flute' },
  { id: 'clarinet', name: 'Clarinet' }
];

const MainWidget: Component = () => {
  const { toggleMainWidget, mainWidgetStates, updateMainWidgetState } = useMainWidget();
  let isResizing = false;
  let startX = 0;
  let startWidth = 300;
  let panelRef: HTMLDivElement | undefined;

  const handleWidgetChange = (index: number, value: string) => {
    updateMainWidgetState(index, { selectedWidget: value });
  };

  const handleVolumeChange = (index: number, value: number) => {
    updateMainWidgetState(index, { volume: value });
  };

  const toggleHand = (index: number) => {
    updateMainWidgetState(index, { 
      isHandOpen: !mainWidgetStates()[index].isHandOpen 
    });
  };

  const toggleVisibility = (index: number) => {
    updateMainWidgetState(index, { 
      isVisible: !mainWidgetStates()[index].isVisible 
    });
  };

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
    <div class="main-widget-panel" ref={panelRef}>
      <div 
        class="main-widget-resize-handle"
        onMouseDown={startResize}
      />
      <div class="main-widget-header">
        <h2>Main Widget Configuration</h2>
        <button class="close-main-widget" onClick={toggleMainWidget}>×</button>
      </div>
      <div class="main-widget-content">
        {mainWidgetStates().map((widget, index) => (
          <div class="main-widget-item">
            <label>Widget {index + 1}</label>
            <select
              value={widget.selectedWidget}
              onChange={(e) => handleWidgetChange(index, e.currentTarget.value)}
            >
              <option value="">Select Widget</option>
              {widgets.map(widget => (
                <option value={widget.id}>{widget.name}</option>
              ))}
            </select>
            <div class="main-widget-controls">
              <div class="volume-control">
                <VolumeIcon />
                <input
                  type="range"
                  class="volume-slider"
                  min="0"
                  max="100"
                  value={widget.volume}
                  onChange={(e) => handleVolumeChange(index, parseInt(e.currentTarget.value))}
                />
              </div>
              <button 
                class={`main-widget-button ${widget.isHandOpen ? 'active' : ''}`}
                onClick={() => toggleHand(index)}
                title={widget.isHandOpen ? 'Close Hand' : 'Open Hand'}
              >
                <HandIcon />
              </button>
              <button 
                class={`main-widget-button ${widget.isVisible ? 'active' : ''}`}
                onClick={() => toggleVisibility(index)}
                title={widget.isVisible ? 'Hide Widget' : 'Show Widget'}
              >
                <EyeIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainWidget;