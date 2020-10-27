import React from 'react';
import StartGame from '../GameActions/GameActions';
import classNames from './EndGame.module.css';
import reloadIcon from '../../assets/Icon open-reload.svg';

function EndGame(props) {
  const playAgainHandler = () => {
    props.playAgain();
  };

  const prevGame = props.previousGames[props.previousGames.length - 1];

  return (
    <div className={classNames.EndGame}>
      <span className={classNames.GameName}>SCORE : {prevGame.gameName}</span>
      <span className={classNames.gameTime}>{prevGame.gameTime}</span>
      {props.bestGame === prevGame.gameName && (
        <span className={classNames.highScore}>New High Score</span>
      )}
      <StartGame click={playAgainHandler} text='PLAY AGAIN' icon={reloadIcon} />
      <span className={classNames.quit}>
        <a href='#' onClick={props.quitGame}>QUIT</a>
      </span>
    </div>
  );
}

export default EndGame;
