// src/App.js
import React from 'react';
import './styles/App.css'; // Create this file for your basic styles
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Task Management Dashboard</h1>
      </header>
      <main>
        {/* TaskBoard component will be built in later phases */}
        <TaskBoard />
      </main>
    </div>
  );
}

export default App;
