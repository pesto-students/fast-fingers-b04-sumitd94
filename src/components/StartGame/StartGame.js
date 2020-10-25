import React from 'react';
import classNames from './StartGame.module.css';
import playButton from '../../assets/playButton.svg';

const StartGame = (props) => {
  return (
    <div
      className={classNames.startGameContainer}
      title='Start Game'
      onClick={props.click}
    >
      <img src={playButton} alt='Start Game' />
      <span className={classNames.startGameText}>Start Game</span>
    </div>
  );
};

export default StartGame;
