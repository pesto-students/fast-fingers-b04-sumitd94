import React from 'react';
import PropTypes from 'prop-types';
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
      <span className={classNames.quit} onClick={props.quitGame}>
        QUIT
      </span>
    </div>
  );
}

EndGame.propTypes = {
  playAgain: PropTypes.func,
  previousGames: PropTypes.array,
  bestGame: PropTypes.string,
  quitGame: PropTypes.func,
};

export default EndGame;
