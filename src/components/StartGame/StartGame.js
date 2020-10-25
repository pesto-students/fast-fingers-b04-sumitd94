import React from 'react';
import classNames from './StartGame.module.css';
import playButton from '../../assets/playButton.svg';

const StartGame = () => {
  return (
    <div className={classNames.startGameContainer} title='Start Game'>
      <img src={playButton} alt='Start Game' />
      <span className={classNames.startGameText}>Start Game</span>
    </div>
  );
};

export default StartGame;
