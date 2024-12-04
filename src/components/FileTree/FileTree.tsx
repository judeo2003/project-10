import { Component, createMemo, Show } from 'solid-js';
import { FileTreeItem } from './FileTreeItem';
import { useFiles } from '../../store/files';
import { useTracks } from '../../store/tracks';
import { useWidgets } from '../../store/widgets';
import { useMainWidget } from '../../store/mainWidget';
import TracksPanel from '../Tracks/TracksPanel';
import WidgetsPanel from '../Widgets/WidgetsPanel';
import MainWidget from '../Widgets/MainWidget/MainWidget';
import './FileTree.css';

export interface TreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: TreeItem[];
  level: number;
}

const FileTree: Component = () => {
  const { songs, recentSongs } = useFiles();
  const { isTracksVisible } = useTracks();
  const { isWidgetsVisible } = useWidgets();
  const { isMainWidgetVisible } = useMainWidget();
  
  const items = createMemo(() => [
    {
      name: 'src',
      type: 'folder' as const,
      level: 0,
      children: [
        {
          name: 'components',
          type: 'folder',
          level: 1,
          children: [
            { name: 'App.tsx', type: 'file', level: 2 },
            { name: 'Editor.tsx', type: 'file', level: 2 },
            { name: 'FileTree.tsx', type: 'file', level: 2 },
            { name: 'MusicSheet.tsx', type: 'file', level: 2 }
          ]
        },
        { name: 'index.tsx', type: 'file', level: 1 },
        { name: 'store', type: 'folder', level: 1, children: [
          { name: 'files.ts', type: 'file', level: 2 },
          { name: 'tracks.ts', type: 'file', level: 2 }
        ]}
      ]
    },
    {
      name: 'Songs',
      type: 'folder',
      level: 0,
      children: [
        { name: 'tracks.track', type: 'file', level: 1 },
        { name: 'widgets.widget', type: 'file', level: 1 },
        ...recentSongs().slice(0, 6).map(song => ({
          name: song.name,
          type: 'file',
          level: 1
        }))
      ]
    },
    {
      name: 'Widgets',
      type: 'folder',
      level: 0,
      children: [
        { name: 'MainWidget.widget', type: 'file', level: 1 },
        { name: 'Piano.widget', type: 'file', level: 1 },
        { name: 'Metronome.widget', type: 'file', level: 1 },
        { name: 'Tuner.widget', type: 'file', level: 1 }
      ]
    }
  ]);

  return (
    <>
      <div class="file-tree-container">
        <div class="panels-container">
          <div class="file-tree">
            <div class="file-tree-header">
              <span>EXPLORER</span>
            </div>
            <div class="file-tree-content">
              {items().map((item) => (
                <FileTreeItem item={item} />
              ))}
            </div>
          </div>
          <Show when={isTracksVisible()}>
            <TracksPanel />
          </Show>
          <Show when={isWidgetsVisible()}>
            <WidgetsPanel />
          </Show>
          <Show when={isMainWidgetVisible()}>
            <MainWidget />
          </Show>
        </div>
      </div>
    </>
  );
};

export default FileTree;