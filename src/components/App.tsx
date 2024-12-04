import { Component } from 'solid-js';
import Titlebar from './Titlebar/Titlebar';
import Sidebar from './Sidebar/Sidebar';
import Editor from './Editor/Editor';
import TerminalManager from './Terminal/TerminalManager';
import './App.css';

const App: Component = () => {
  return (
    <div class="app-container">
      <Titlebar />
      <div class="main-container">
        <Sidebar />
        <div class="editor-container">
          <Editor />
          <TerminalManager />
        </div>
      </div>
    </div>
  );
};

export default App;