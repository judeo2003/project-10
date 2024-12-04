import { Component } from 'solid-js';

export const MaximizeIcon: Component = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M4 1H1V4M13 4V1H10M10 13H13V10M1 10V13H4"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const MinimizeIcon: Component = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M13 6H8V1M1 8H6V13M13 1L8 6M1 13L6 8"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const CloseIcon: Component = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M13 1L1 13M1 1L13 13"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const AddTerminalIcon: Component = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1v12M1 7h12"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export const DebugIcon: Component = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);