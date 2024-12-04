import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

const [isUserPanelVisible, setUserPanelVisible] = makePersisted(
  createSignal(false),
  { name: 'userPanelVisible' }
);

export const useUser = () => {
  const toggleUserPanel = () => setUserPanelVisible(prev => !prev);
  const hideUserPanel = () => setUserPanelVisible(false);
  const showUserPanel = () => setUserPanelVisible(true);

  return {
    isUserPanelVisible,
    toggleUserPanel,
    hideUserPanel,
    showUserPanel
  };
};