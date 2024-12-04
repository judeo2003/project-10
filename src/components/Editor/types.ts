import { JSXElement } from 'solid-js';

export interface Tab {
  id: string;
  title: string;
  icon?: JSXElement;
  content: JSXElement;
}