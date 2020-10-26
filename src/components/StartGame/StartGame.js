import React from 'react';
import classNames from './StartGame.module.css';
import playButton from '../../assets/playButton.svg';
import PropTypes from 'prop-types';

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

StartGame.propTypes = {
  click: PropTypes.func,
};

export default StartGame;
