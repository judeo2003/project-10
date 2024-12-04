import { Component } from 'solid-js';

export const VolumeIcon: Component = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2L4 5H1v6h3l4 3V2z"
      fill="currentColor"
    />
    <path
      d="M10.5 5.5a3 3 0 0 1 0 5M12.5 3.5a6 6 0 0 1 0 9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export const HandIcon: Component = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M5 5V2a1 1 0 0 1 2 0v3m2-2v-1a1 1 0 0 1 2 0v5M9 5V3a1 1 0 0 1 2 0v2m-8 2v3a4 4 0 0 0 8 0V7"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const EyeIcon: Component = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 3C3 3 1 8 1 8s2 5 7 5 7-5 7-5-2-5-7-5z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="8"
      cy="8"
      r="2"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);