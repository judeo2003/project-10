import { Component, Show, onMount, onCleanup } from 'solid-js';
import { FileIcon, SearchIcon, SourceControlIcon, ExtensionsIcon, SettingsIcon, UserIcon, CalendarIcon } from '../Icons/SidebarIcons';
import Settings from '../Settings/Settings';
import FileTree from '../FileTree/FileTree';
import { useSidebar } from '../../store/sidebar';
import { useEvents } from '../../store/events';
import { useUser } from '../../store/user';
import './Sidebar.css';

const Sidebar: Component = () => {
  const { activeView, isExpanded, toggleView, panelWidth, setPanelWidth } = useSidebar();
  const { emit } = useEvents();
  const { toggleUserPanel } = useUser();
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  const startResize = (e: MouseEvent) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = panelWidth();
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing) return;
    const delta = e.clientX - startX;
    const newWidth = Math.max(200, Math.min(800, startWidth + delta));
    setPanelWidth(newWidth);
  };

  const stopResize = () => {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  onMount(() => {
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);
  });

  onCleanup(() => {
    window.removeEventListener('mousemove', handleResize);
    window.removeEventListener('mouseup', stopResize);
  });

  const handleIconClick = (view: string) => {
    if (view === 'user') {
      toggleUserPanel();
    } else {
      toggleView(view as any);
      if (view === 'settings') {
        emit('openFile', {
          id: 'settings',
          title: 'Settings',
          icon: <SettingsIcon />,
          content: <Settings />
        });
      }
    }
  };

  return (
    <div 
      class="sidebar-container" 
      classList={{ expanded: isExpanded() }} 
      style={{ width: isExpanded() ? `${panelWidth()}px` : '50px' }}
    >
      <div class="sidebar">
        <div class="sidebar-icons">
          <div 
            class={`sidebar-icon ${activeView() === 'files' ? 'active' : ''}`}
            onClick={() => handleIconClick('files')}
          >
            <FileIcon />
          </div>
          <div 
            class={`sidebar-icon ${activeView() === 'search' ? 'active' : ''}`}
            onClick={() => handleIconClick('search')}
          >
            <SearchIcon />
          </div>
          <div 
            class={`sidebar-icon ${activeView() === 'source-control' ? 'active' : ''}`}
            onClick={() => handleIconClick('source-control')}
          >
            <SourceControlIcon />
          </div>
          <div 
            class={`sidebar-icon ${activeView() === 'extensions' ? 'active' : ''}`}
            onClick={() => handleIconClick('extensions')}
          >
            <ExtensionsIcon />
          </div>
          <div 
            class={`sidebar-icon ${activeView() === 'calendar' ? 'active' : ''}`}
            onClick={() => handleIconClick('calendar')}
          >
            <CalendarIcon />
          </div>
        </div>
        <div class="sidebar-bottom">
          <div 
            class={`sidebar-icon ${activeView() === 'settings' ? 'active' : ''}`}
            onClick={() => handleIconClick('settings')}
          >
            <SettingsIcon />
          </div>
          <div 
            class="sidebar-icon"
            onClick={() => handleIconClick('user')}
          >
            <UserIcon />
          </div>
        </div>
      </div>
      <div class="sidebar-panel">
        <Show when={activeView() === 'files'}>
          <FileTree />
        </Show>
        <div 
          class="sidebar-resize-handle" 
          onMouseDown={startResize}
        />
      </div>
    </div>
  );
};

export default Sidebar;