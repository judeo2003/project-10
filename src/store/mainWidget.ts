import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

export interface MainWidgetState {
  volume: number;
  isHandOpen: boolean;
  isVisible: boolean;
  selectedWidget: string;
}

const [isMainWidgetVisible, setMainWidgetVisible] = makePersisted(
  createSignal(false),
  { name: 'mainWidgetVisible' }
);

const [mainWidgetStates, setMainWidgetStates] = makePersisted(
  createSignal<MainWidgetState[]>(
    Array(5).fill(null).map(() => ({
      volume: 75,
      isHandOpen: true,
      isVisible: true,
      selectedWidget: ''
    }))
  ),
  { name: 'mainWidgetStates' }
);

export const useMainWidget = () => {
  const toggleMainWidget = () => setMainWidgetVisible(prev => !prev);
  const hideMainWidget = () => setMainWidgetVisible(false);
  const showMainWidget = () => setMainWidgetVisible(true);

  const updateMainWidgetState = (index: number, updates: Partial<MainWidgetState>) => {
    setMainWidgetStates(prev => {
      const newStates = [...prev];
      newStates[index] = { ...newStates[index], ...updates };
      return newStates;
    });
  };

  return {
    isMainWidgetVisible,
    mainWidgetStates,
    toggleMainWidget,
    hideMainWidget,
    showMainWidget,
    updateMainWidgetState
  };
};