import React, { useState } from 'react';
import classNames from './Home.module.css';
import keyboard from '../../assets/keyboard.svg';
import InputBox from '../InputBox/InputBox';
import SelectBox from '../SelectBox/SelectBox';
import StartGame from '../StartGame/StartGame';

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
        <p className={classNames.errorMsg}>
          Hey, Please let us know your name !
        </p>
      ) : null}
      <InputBox change={nameChangeHandler} name={state.name} />
      <SelectBox
        options={props.gameLevels}
        change={difficultyLevelChangeHandler}
      />
      <StartGame click={startGameHandler} />
    </div>
  );
};

export default Home;
