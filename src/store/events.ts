import { createSignal } from 'solid-js';

type EventType = 'add-terminal' | 'remove-terminal' | 'split-terminal';
type EventCallback = (detail?: any) => void;

const [eventHandlers] = createSignal<Map<EventType, Set<EventCallback>>>(new Map());

export const useEvents = () => {
  const subscribe = (event: EventType, callback: EventCallback) => {
    if (!eventHandlers().has(event)) {
      eventHandlers().set(event, new Set());
    }
    eventHandlers().get(event)?.add(callback);

    return () => {
      eventHandlers().get(event)?.delete(callback);
    };
  };

  const emit = (event: EventType, detail?: any) => {
    eventHandlers().get(event)?.forEach(handler => handler(detail));
  };

  return { subscribe, emit };
};