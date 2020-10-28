import React from 'react';
import classNames from './SelectBox.module.css';
import PropTypes from 'prop-types';

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

SelectBox.propTypes = {
  change: PropTypes.func,
  options: PropTypes.array,
};

export default SelectBox;
