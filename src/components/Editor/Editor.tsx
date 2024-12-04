import { Component, Show, createSignal, onMount, onCleanup } from 'solid-js';
import './Editor.css';
import EditorTabs from './EditorTabs';
import type { Tab } from './types';
import { useSidebar } from '../../store/sidebar';
import { useEvents } from '../../store/events';
import { useDebug } from '../../store/debug';

const Editor: Component = () => {
  const [tabs, setTabs] = createSignal<Tab[]>([]);
  const [activeTab, setActiveTab] = createSignal<string | null>(null);
  const { toggleView } = useSidebar();
  const { subscribe } = useEvents();
  const { showDebugControls, hideDebugControls } = useDebug();

  const openTab = (tab: Tab) => {
    if (!tabs().find(t => t.id === tab.id)) {
      setTabs([...tabs(), tab]);
    }
    setActiveTab(tab.id);

    // Show debug controls only for .mid or .musicxml files
    if (tab.id.endsWith('.mid') || tab.id.endsWith('.musicxml')) {
      showDebugControls();
    } else {
      hideDebugControls();
    }
  };

  const closeTab = (tabId: string) => {
    const closedTab = tabs().find(tab => tab.id === tabId);
    setTabs(tabs().filter(tab => tab.id !== tabId));
    
    if (activeTab() === tabId) {
      const remainingTabs = tabs().filter(tab => tab.id !== tabId);
      setActiveTab(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null);
    }

    if (closedTab?.id === 'settings') {
      toggleView('files');
    }

    // Hide debug controls if closing a .mid or .musicxml file
    if (tabId.endsWith('.mid') || tabId.endsWith('.musicxml')) {
      hideDebugControls();
    }
  };

  onMount(() => {
    const unsubscribeSettings = subscribe('openSettings', openTab);
    const unsubscribeFile = subscribe('openFile', openTab);

    onCleanup(() => {
      unsubscribeSettings();
      unsubscribeFile();
    });
  });

  return (
    <div class="editor">
      <Show
        when={tabs().length > 0}
        fallback={
          <div class="welcome-screen">
            <h1>Solid Code</h1>
            <p>A lightweight code editor built with SolidJS</p>
          </div>
        }
      >
        <EditorTabs
          tabs={tabs()}
          activeTab={activeTab()}
          onTabClick={setActiveTab}
          onTabClose={closeTab}
        />
        <div class="editor-content">
          <For each={tabs()}>
            {(tab) => (
              <div
                class="tab-content"
                classList={{ active: activeTab() === tab.id }}
              >
                {tab.content}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default Editor;