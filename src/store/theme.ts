import { createSignal, createEffect } from 'solid-js';
import { createStorage } from "@solid-primitives/storage";

export type Theme = 'dark' | 'light' | 'high-contrast';

export interface ThemeColors {
  '--editor-bg': string;
  '--sidebar-bg': string;
  '--activity-bar-bg': string;
  '--titlebar-bg': string;
  '--text-primary': string;
  '--text-secondary': string;
  '--border-color': string;
  '--hover-bg': string;
  '--accent-color': string;
  '--accent-hover': string;
}

const themes: Record<Theme, ThemeColors> = {
  dark: {
    '--editor-bg': '#1e1e1e',
    '--sidebar-bg': '#252526',
    '--activity-bar-bg': '#333333',
    '--titlebar-bg': '#323233',
    '--text-primary': '#d4d4d4',
    '--text-secondary': '#cccccc',
    '--border-color': '#474747',
    '--hover-bg': 'rgba(90, 93, 94, 0.31)',
    '--accent-color': '#0e639c',
    '--accent-hover': '#1177bb'
  },
  light: {
    '--editor-bg': '#ffffff',
    '--sidebar-bg': '#f3f3f3',
    '--activity-bar-bg': '#2c2c2c',
    '--titlebar-bg': '#dddddd',
    '--text-primary': '#000000',
    '--text-secondary': '#333333',
    '--border-color': '#e0e0e0',
    '--hover-bg': 'rgba(0, 0, 0, 0.05)',
    '--accent-color': '#007acc',
    '--accent-hover': '#0098ff'
  },
  'high-contrast': {
    '--editor-bg': '#000000',
    '--sidebar-bg': '#000000',
    '--activity-bar-bg': '#000000',
    '--titlebar-bg': '#000000',
    '--text-primary': '#ffffff',
    '--text-secondary': '#ffffff',
    '--border-color': '#6b6b6b',
    '--hover-bg': 'rgba(255, 255, 255, 0.1)',
    '--accent-color': '#0098ff',
    '--accent-hover': '#00b4ff'
  }
};

const [storage] = createStorage();
const [theme, setTheme] = createSignal<Theme>(
  (storage.theme as Theme) || 'dark'
);

export const useTheme = () => {
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const colors = themes[newTheme];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    storage.theme = newTheme;
    setTheme(newTheme);
  };

  createEffect(() => {
    if (typeof document !== 'undefined') {
      applyTheme(theme());
    }
  });

  return {
    theme,
    setTheme: applyTheme,
    themes: Object.keys(themes) as Theme[]
  };
};