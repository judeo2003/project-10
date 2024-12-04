import { Component } from 'solid-js';

export const FolderIcon: Component = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      fill="currentColor"
      d="M1.5 1h5.586L8.5 2.414V3H1.5L1 3.5v9l.5.5h12l.5-.5v-7L13.5 5H8.707l-1-1H1.5l.5-.5v-.5L1.5 1z"
    />
  </svg>
);

export const FileIcon: Component = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      fill="currentColor"
      d="M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v3l1 1h3v8z"
    />
  </svg>
);