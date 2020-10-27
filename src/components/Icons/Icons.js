import React from 'react';
import classNames from './Icons.module.css';
import PropTypes from 'prop-types';

const Icons = (props) => {
  return (
    <div className={classNames.appIcon} title={props.text}>
      {props.icon && <img src={props.icon} alt={props.text} />}

      {props.text && <span>{props.text}</span>}
    </div>
  );
};

Icons.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default Icons;
