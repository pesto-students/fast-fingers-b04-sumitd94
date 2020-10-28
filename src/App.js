import React, { Component } from 'react';
import Home from './components/Home/Home';
import GameDetails from './components/GameDetails/GameDetails';
import EndGame from './components/EndGame/EndGame';
import { loadDictionary } from './utils/dictionary';
import './App.css';

class App extends Component {
  APP_NAME = 'fast fingers';
  TAG_NAME = '________ the ultimate typing game ________';
  DIFFICULTY_LEVELS = [
    { level: 'EASY', difficultyFactor: 1 },
    { level: 'MEDIUM', difficultyFactor: 1.5 },
    { level: 'HARD', difficultyFactor: 2 },
  ];
  MIN_WORD_LENGTH = 2;
  MAX_WORD_LENGTH = 20;

  state = {
    playerName: '',
    showHomeScreen: true,
    showGameScreen: false,
    showEndScreen: false,
    difficultyLevel: 'EASY',
    difficultyFactor: 1,
    initalLevel: 'EASY',
    previousGames: [],
    gameName: '',
    bestGame: '',
    gameStartAt: '',
  };

  startGameHandler = (playerName, difficultyLevel) => {
    const levelObj = this.DIFFICULTY_LEVELS.find((levels) => {
      return levels.level === difficultyLevel;
    });

    const gamesFromStorage = JSON.parse(localStorage.getItem(playerName));
    let gameNumber = this.state.previousGames.length;

    this.setState({
      gameStartAt: new Date().getTime(),
      showHomeScreen: false,
      showGameScreen: true,
      showEndScreen: false,
      playerName: playerName,
      difficultyLevel: difficultyLevel,
      difficultyFactor: levelObj.difficultyFactor,
      initalLevel: difficultyLevel,
      gameName: `Game ${gameNumber}`,
      previousGames: gamesFromStorage ? gamesFromStorage : [],
    });
  };

  componentDidMount = () => {
    this.loadWordsFromDictionary(this.MIN_WORD_LENGTH, this.MAX_WORD_LENGTH);
  };

  loadWordsFromDictionary = async (minLength, maxLength) => {
    await loadDictionary(minLength, maxLength);
  };

  failGameHandler = () => {
    const [prevGames, bestGame] = this.managePreviousGames();
    this.setState({
      showEndScreen: true,
      showGameScreen: false,
      difficultyFactor: null,
      bestGame: bestGame,
      gameStartAt: null,
      previousGames: prevGames,
    });
  };

  quitGame = () => {
    localStorage.removeItem(this.state.playerName);
    this.setState({
      playerName: '',
      showHomeScreen: true,
      showGameScreen: false,
      showEndScreen: false,
      difficultyLevel: 'EASY',
      difficultyFactor: 1,
      initalLevel: 'EASY',
      previousGames: [],
      gameName: '',
      bestGame: '',
      gameStartAt: '',
    });
  };

  managePreviousGames = () => {
    const returnData = [];
    const currentTime = new Date().getTime();
    const timeSpentInGame = currentTime - this.state.gameStartAt;
    const gameTime = `${parseInt(timeSpentInGame / 1000)}:${(
      (timeSpentInGame % 1000) +
      '0'
    ).substring(0, 2)}`;
    const currentGame = {
      gameName: this.state.gameName,
      playerName: this.state.playerName,
      difficultyFactor: this.state.difficultyFactor,
      gameStartAt: this.state.gameStartAt,
      gameEndAt: currentTime,
      timeSpentInGame: timeSpentInGame,
      gameTime: gameTime,
    };

    const games = [...this.state.previousGames, currentGame];
    returnData.push(games);

    let bestGame = games[0];

    for (let i = 1; i < games.length; i++) {
      if (games[i].timeSpentInGame > bestGame.timeSpentInGame) {
        bestGame = games[i];
      }
    }

    localStorage.setItem(this.state.playerName, JSON.stringify(games));
    returnData.push(bestGame.gameName);
    return returnData;
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
            ''
          )}
        </div>
        <div className='Game-Screen'>
          {this.state.showGameScreen ? (
            <GameDetails
              playerName={this.state.playerName}
              difficultyLevel={this.state.difficultyLevel}
              difficultyFactor={this.state.difficultyFactor}
              onFailure={this.failGameHandler}
              previousGames={this.state.previousGames}
              bestGame={this.state.bestGame}
              gameStartAt={this.state.gameStartAt}
            />
          ) : (
            ''
          )}

          {this.state.showEndScreen ? (
            <EndGame
              playAgain={() =>
                this.startGameHandler(
                  this.state.playerName,
                  this.state.initalLevel
                )
              }
              bestGame={this.state.bestGame}
              previousGames={this.state.previousGames}
              quitGame={this.quitGame}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default App;
