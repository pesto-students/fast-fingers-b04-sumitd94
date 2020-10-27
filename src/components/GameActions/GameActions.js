import React from 'react';
import classNames from './GameActions.module.css';
import PropTypes from 'prop-types';

const GameActions = (props) => {
  return (
    <div
      className={classNames.startGameContainer}
      title={props.text}
      onClick={props.click}
    >
      <img src={props.icon} alt={props.text} />
      <span className={classNames.startGameText}>{props.text}</span>
    </div>
  );
};

GameActions.propTypes = {
  click: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default GameActions;
