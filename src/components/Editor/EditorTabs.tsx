import { Component, For } from 'solid-js';
import type { Tab } from './types';
import './EditorTabs.css';

interface EditorTabsProps {
  tabs: Tab[];
  activeTab: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const EditorTabs: Component<EditorTabsProps> = (props) => {
  return (
    <div class="editor-tabs">
      <For each={props.tabs}>
        {(tab) => (
          <div
            class="editor-tab"
            classList={{ active: props.activeTab === tab.id }}
            onClick={() => props.onTabClick(tab.id)}
          >
            <span class="tab-icon">{tab.icon}</span>
            <span class="tab-title">{tab.title}</span>
            <button
              class="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                props.onTabClose(tab.id);
              }}
            >
              ×
            </button>
          </div>
        )}
      </For>
    </div>
  );
};

export default EditorTabs;