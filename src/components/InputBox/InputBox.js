import React from 'react';
import classNames from './InputBox.module.css';
import PropTypes from 'prop-types';

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

InputBox.propTypes = {
  name: PropTypes.string,
  change: PropTypes.func,
};

export default InputBox;
