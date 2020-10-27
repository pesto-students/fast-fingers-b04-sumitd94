import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './GameDetails.module.css';
import PersonIcon from '../../assets/Icon material-person.svg';
import GamePad from '../../assets/Icon awesome-gamepad.svg';
import crossIcon from '../../assets/Icon metro-cross.svg';
import Icons from '../Icons/Icons';
import StartGame from '../GameActions/GameActions';
import Scorecard from '../Scorecard/Scorecard';
import Game from '../Game/Game';

const GameDetails = (props) => {
  const [state, setState] = useState({
    difficultyLevel: props.difficultyLevel,
    difficultyFactor: props.difficultyFactor,
  });

  const wordMatchHandler = () => {
    const difficultyFactor = state.difficultyFactor + 0.01;
    let gameLevel = 'EASY';

    if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
      gameLevel = 'MEDIUM';
    }

    if (difficultyFactor >= 2) {
      gameLevel = 'HARD';
    }

    setState({
      difficultyLevel: gameLevel,
      difficultyFactor: difficultyFactor,
    });
  };

  const stopGameHandler = () => {
    props.onFailure();
  };

  return (
    <>
      <div className={classNames.leftPanel}>
        <div className={classNames.gameDetails}>
          <Icons icon={PersonIcon} text={props.playerName} />
          <Icons icon={GamePad} text={`LEVEL: ${state.difficultyLevel}`} />
        </div>
      </div>
      <div className={classNames.scoreCardDiv}>
        <Scorecard
          previousGames={props.previousGames}
          bestGame={props.bestGame}
        />
      </div>
      <div className={classNames.gameArenaDiv}>
        <Game
          level={props.difficultyLevel}
          difficultyFactor={props.difficultyFactor}
          onWordMatch={wordMatchHandler}
          onFailure={props.onFailure}
        />
      </div>

      <div className={classNames.stopGame}>
        <StartGame click={stopGameHandler} text='STOP GAME' icon={crossIcon} />
      </div>
    </>
  );
};

GameDetails.propTypes = {
  difficultyLevel: PropTypes.string,
  difficultyFactor: PropTypes.number,
  playerName: PropTypes.string,
  onFailure: PropTypes.func,
  bestGame: PropTypes.string,
  previousGames: PropTypes.array,
};

export default GameDetails;
