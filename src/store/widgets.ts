import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export interface WidgetState {
  volume: number;
  isHandOpen: boolean;
  isVisible: boolean;
  selectedWidget: string;
}

const [isWidgetsVisible, setWidgetsVisible] = makePersisted(
  createSignal(false),
  { name: 'widgetsVisible' }
);

const [widgetStates, setWidgetStates] = makePersisted(
  createSignal<WidgetState[]>(
    Array(5).fill(null).map(() => ({
      volume: 75,
      isHandOpen: true,
      isVisible: true,
      selectedWidget: ''
    }))
  ),
  { name: 'widgetStates' }
);

export const useWidgets = () => {
  const toggleWidgets = () => setWidgetsVisible(prev => !prev);
  const hideWidgets = () => setWidgetsVisible(false);
  const showWidgets = () => setWidgetsVisible(true);

  const updateWidgetState = (index: number, updates: Partial<WidgetState>) => {
    setWidgetStates(prev => {
      const newStates = [...prev];
      newStates[index] = { ...newStates[index], ...updates };
      return newStates;
    });
  };

  return {
    isWidgetsVisible,
    widgetStates,
    toggleWidgets,
    hideWidgets,
    showWidgets,
    updateWidgetState
  };
};