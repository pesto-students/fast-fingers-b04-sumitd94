import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from './Word.module.css';

const Word = (props) => {
  const [state, setState] = useState([]);

  /* eslint-disable */
  useEffect(() => {
    compareWord(props.word, props.typedWord);
  }, [props]);
  /* eslint-enable */

  function compareWord(actualWord, typedWord) {
    if (!actualWord) {
      return;
    }

    actualWord = actualWord.toUpperCase();
    typedWord = typedWord.toUpperCase();

    const wordInfo = [];
    let isWordMatched = true;
    const actualWordCharArr = actualWord.split('');

    for (let i = 0; i < actualWordCharArr.length; i++) {
      const charData = {
        char: actualWordCharArr[i],
        isMatched: typedWord[i] === actualWordCharArr[i],
        isNotFound: typedWord[i] === undefined,
      };

      if (typedWord[i] !== actualWordCharArr[i]) {
        isWordMatched = false;
      }

      wordInfo.push(charData);
    }

    setState([...wordInfo]);

    if (isWordMatched) {
      onMatch();
    }
  }

  function onMatch() {
    props.onMatch && props.onMatch();
  }

  return (
    <div className={classNames.AppWord}>
      {state.map((char, index) => {
        let className = [classNames.characters];
        if (!char.isNotFound) {
          char.isMatched === true
            ? className.push(classNames.matched)
            : className.push(classNames.unmatched);
        }
        return (
          <div className={className.join(' ')} key={index}>
            {char.char}
          </div>
        );
      })}
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.string,
  typedWord: PropTypes.string,
  onMatch: PropTypes.func,
};

export default Word;
