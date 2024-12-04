import { Component, Show, createSignal, For } from 'solid-js';
import type { TreeItem } from './FileTree';
import { FolderIcon, getIconForFile } from './FileTypeIcons';
import FileViewer from '../FileViewer/FileViewer';
import MusicSheet from '../MusicSheet/MusicSheet';
import { useEvents } from '../../store/events';
import { useFiles } from '../../store/files';
import { useTracks } from '../../store/tracks';
import { useWidgets } from '../../store/widgets';
import { useMainWidget } from '../../store/mainWidget';

interface FileTreeItemProps {
  item: TreeItem;
}

export const FileTreeItem: Component<FileTreeItemProps> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(true);
  const { emit } = useEvents();
  const { songs } = useFiles();
  const { toggleTracks } = useTracks();
  const { toggleWidgets } = useWidgets();
  const { toggleMainWidget } = useMainWidget();

  const toggleExpand = (e: MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded());
  };

  const handleItemClick = () => {
    if (props.item.name === 'tracks.track') {
      toggleTracks();
      return;
    }

    if (props.item.name === 'widgets.widget') {
      toggleWidgets();
      return;
    }

    if (props.item.name === 'MainWidget.widget') {
      toggleMainWidget();
      return;
    }

    if (props.item.type === 'folder') {
      setIsExpanded(!isExpanded());
    } else {
      // Handle file click
      if (props.item.name === 'Editor.tsx') {
        emit('openFile', {
          id: props.item.name,
          title: props.item.name,
          icon: getIconForFile(props.item.name)(),
          content: <MusicSheet />
        });
      } else if (props.item.name.endsWith('.mid') || 
                 props.item.name.endsWith('.midi') || 
                 props.item.name.endsWith('.musicxml')) {
        emit('openFile', {
          id: props.item.name,
          title: props.item.name,
          icon: getIconForFile(props.item.name)(),
          content: <MusicSheet />
        });
      } else {
        const content = `// Sample content for ${props.item.name}\n` +
                       `// This is a text file viewer\n\n` +
                       `function example() {\n` +
                       `  console.log("Hello from ${props.item.name}");\n` +
                       `  return "Sample content";\n` +
                       `}\n`;

        emit('openFile', {
          id: props.item.name,
          title: props.item.name,
          icon: getIconForFile(props.item.name)(),
          content: <FileViewer filename={props.item.name} content={content} />
        });
      }
    }
  };

  const FileIconComponent = props.item.type === 'file' 
    ? getIconForFile(props.item.name)
    : FolderIcon;

  return (
    <div class="tree-item-container">
      <div 
        class="tree-item" 
        style={{ 'padding-left': `${props.item.level * 12}px` }}
        onClick={handleItemClick}
      >
        <Show when={props.item.type === 'folder'}>
          <span 
            class={`expand-arrow ${isExpanded() ? 'expanded' : ''}`}
            onClick={toggleExpand}
          >▶</span>
        </Show>
        <span class="item-icon">
          <FileIconComponent />
        </span>
        <span class="item-name">{props.item.name}</span>
      </div>
      <Show when={props.item.type === 'folder' && isExpanded()}>
        <div class="tree-item-children">
          <For each={props.item.children}>
            {(child) => <FileTreeItem item={child} />}
          </For>
        </div>
      </Show>
    </div>
  );
};