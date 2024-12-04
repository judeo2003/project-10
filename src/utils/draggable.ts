import { createEventListener } from '@solid-primitives/event-listener';

interface Position {
  x: number;
  y: number;
}

export const createDraggable = (element: HTMLElement) => {
  let isDragging = false;
  let currentPos: Position = { x: 0, y: 0 };
  let startPos: Position = { x: 0, y: 0 };

  const dragStart = (e: MouseEvent) => {
    isDragging = true;
    startPos = {
      x: e.clientX - currentPos.x,
      y: e.clientY - currentPos.y
    };
  };

  const dragEnd = () => {
    isDragging = false;
  };

  const drag = (e: MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    currentPos = {
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    };

    element.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px)`;
  };

  const removeListeners = [
    createEventListener(element, 'mousedown', dragStart),
    createEventListener(window, 'mousemove', drag),
    createEventListener(window, 'mouseup', dragEnd)
  ];

  const cleanupDraggable = () => {
    removeListeners.forEach(remove => remove());
  };

  return {
    initDraggable: () => {},
    cleanupDraggable
  };
};