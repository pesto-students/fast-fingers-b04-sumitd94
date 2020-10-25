import React from 'react';
import classNames from './SelectBox.module.css';

const SelectBox = (props) => {
  return (
    <select className={classNames.difficultyLevel} onChange={props.change}>
      {props.options.map((level, index) => {
        return (
          <option key={index} value={level.level}>
            {level.level}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBox;
