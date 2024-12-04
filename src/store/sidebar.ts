import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export type ActiveView = 'files' | 'search' | 'source-control' | 'extensions' | 'settings' | 'calendar';

const [activeView, setActiveView] = createSignal<ActiveView>('files');
const [isExpanded, setIsExpanded] = createSignal(true);
const [panelWidth, setPanelWidth] = makePersisted(createSignal(300), { name: 'sidebarWidth' });

export const useSidebar = () => {
  const toggleView = (view: ActiveView) => {
    if (view === activeView()) {
      setIsExpanded(!isExpanded());
    } else {
      setIsExpanded(true);
      setActiveView(view);
    }
  };

  return {
    activeView,
    isExpanded,
    panelWidth,
    setPanelWidth,
    toggleView
  };
};