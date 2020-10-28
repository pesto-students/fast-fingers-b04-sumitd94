import React, { useState } from 'react';
import classNames from './Home.module.css';
import keyboard from '../../assets/keyboard.svg';
import InputBox from '../InputBox/InputBox';
import SelectBox from '../SelectBox/SelectBox';
import StartGame from '../GameActions/GameActions';
import playButton from '../../assets/playButton.svg';
import PropTypes from 'prop-types';

const Home = (props) => {
  const imgClassNames = [classNames.AppLogo];

  const [state, updateState] = useState({
    name: '',
    difficultyLevel: 'EASY',
    showErrorMessage: false,
  });

  const nameChangeHandler = (event) => {
    updateState({
      ...state,
      name: event.target.value,
    });
  };

  const difficultyLevelChangeHandler = (event) => {
    updateState({
      ...state,
      difficultyLevel: event.target.value,
    });
  };

  const startGameHandler = () => {
    if (state.name.trim() === '') {
      updateState({
        ...state,
        showErrorMessage: true,
      });
    } else {
      props.startGame(state.name, state.difficultyLevel);
    }
  };

  return (
    <div className={classNames.HomePage}>
      <img
        className={imgClassNames.join(' ')}
        src={keyboard}
        alt={props.name}
      />
      <h1 className={classNames.appName}>{props.name}</h1>
      <p className={classNames.tagName}>{props.tagName}</p>
      {state.showErrorMessage ? (
        <p className={classNames.errorMsg}>Hey, your name please !</p>
      ) : null}
      <InputBox
        change={nameChangeHandler}
        name={state.name}
        placeHolderText='Enter your name here'
      />
      <SelectBox
        options={props.gameLevels}
        change={difficultyLevelChangeHandler}
      />
      <StartGame click={startGameHandler} text='START GAME' icon={playButton} />
    </div>
  );
};

Home.propTypes = {
  name: PropTypes.string,
  tagName: PropTypes.string,
  gameLevels: PropTypes.array,
  startGame: PropTypes.func,
};

export default Home;
