import React, { Component } from 'react';
import Home from './components/Home/Home';
import './App.css';

class App extends Component {
  APP_NAME = 'fast fingers';
  TAG_NAME = '________ the ultimate typing game ________';
  DIFFICULTY_LEVELS = [
    { level: 'EASY', difficultyFactor: 1 },
    { level: 'MEDIUM', difficultyFactor: 1.5 },
    { level: 'HARD', difficultyFactor: 2 },
  ];
  MIN_WORD_LENGTH = 4;
  MAX_WORD_LENGTH = 12;

  state = {
    showHomeScreen: true,
  };

  startGameHandler = (playerName, difficultyLevel) => {
    console.log(difficultyLevel);
    this.setState({
      showHomeScreen: false,
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='Home-Screen'>
          {this.state.showHomeScreen ? (
            <Home
              name={this.APP_NAME}
              tagName={this.TAG_NAME}
              gameLevels={this.DIFFICULTY_LEVELS}
              startGame={this.startGameHandler}
            />
          ) : (
            <p>hey</p>
          )}
        </div>
        <div className='Game-Screen'></div>
      </div>
    );
  }
}

export default App;
