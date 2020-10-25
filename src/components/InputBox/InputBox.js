import React from 'react';
import classNames from './InputBox.module.css';

const InputBox = (props) => {
  return (
    <input
      className={classNames.userName}
      type='text'
      onChange={props.change}
      placeholder='type your name'
      value={props.name}
    />
  );
};

export default InputBox;
