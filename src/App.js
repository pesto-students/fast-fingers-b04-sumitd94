import React from 'react';
import Home from './components/Home/Home';
import './App.css';

function App() {
  const APP_NAME = 'fast fingers';
  const TAG_NAME = '________ the ultimate typing game ________';
  const DIFFICULTY_LEVELS = [
    { level: 'EASY', difficultyFactor: 1 },
    { level: 'MEDIUM', difficultyFactor: 1.5 },
    { level: 'HARD', difficultyFactor: 2 },
  ];

  return (
    <div className='App'>
      <Home name={APP_NAME} tagName={TAG_NAME} gameLevels={DIFFICULTY_LEVELS} />
    </div>
  );
}

export default App;
