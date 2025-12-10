import React from 'react';
import ChatContent from './Components/ChatContent/ChatContent'
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="app-data-container">
        <h1>You can activate the bot by writing Hi/hey/hello!</h1>
        <ChatContent />
      </div>
    </div>
  );
}

export default App;
