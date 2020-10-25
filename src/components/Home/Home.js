import React from 'react';
import classNames from './Home.module.css';
import keyboard from '../../assets/keyboard.svg';
import InputBox from '../InputBox/InputBox';
import SelectBox from '../SelectBox/SelectBox';
import StartGame from '../StartGame/StartGame';

const Home = (props) => {
  const imgClassNames = [classNames.AppLogo];
  return (
    <div className={classNames.HomePage}>
      <img className={imgClassNames.join(' ')} src={keyboard} />
      <h1 className={classNames.appName}>{props.name}</h1>
      <p className={classNames.tagName}>{props.tagName}</p>
      <InputBox />
      <SelectBox options={props.gameLevels} />

      <StartGame />
    </div>
  );
};

export default Home;
