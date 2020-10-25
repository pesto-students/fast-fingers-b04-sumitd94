import React from 'react';
import classNames from './InputBox.module.css';

const InputBox = () => {    
  return <input className={classNames.userName} type='text' placeholder='type your name' />;
};

export default InputBox;
