import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from './Game.module.css';
import Input from '../InputBox/InputBox';
import Word from '../word/Word';
import Timer from '../Timer/Timer';
import { getRandomWordFromDictionary } from '../../utils/dictionary';

const Game = (props) => {
  const DIFFERENT_GAME_STATE = {
    PLAY: 'play',
    SUCCESS: 'success',
    READY: 'ready',
    FAIL:'fail'
  };

  const EASY_WORDS_LENGTH = [2, 3, 4];
  const MEDIUM_WORDS_LENGTH = [5, 6, 7, 8];
  const HARD_WORDS_LENGTH = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const [state, setState] = useState({
    word: '',
    typedWord: '',
    gameState: DIFFERENT_GAME_STATE.READY,
  });

  /* eslint-disable */
  useEffect(() => {
    giveNewWord();
  }, []);
  /* eslint-enable */

  const giveNewWord = () => {
    const word = getRandomWord();
    setState({
      ...state,
      word: word,
      typedWord: '',
      gameState: DIFFERENT_GAME_STATE.PLAY,
    });
  };

  const getRandomWord = () => {
    const wordLength = getWordLength();
    return getRandomWordFromDictionary(wordLength);
  };

  const getWordLength = () => {
    if (props.level === 'EASY') {
      return EASY_WORDS_LENGTH[
        parseInt(Math.random() * 10) % EASY_WORDS_LENGTH.length
      ];
    } else if (props.level === 'MEDIUM') {
      return MEDIUM_WORDS_LENGTH[
        parseInt(Math.random() * 10) % MEDIUM_WORDS_LENGTH.length
      ];
    } else {
      return HARD_WORDS_LENGTH[
        parseInt(Math.random() * 10) % HARD_WORDS_LENGTH.length
      ];
    }
  };

  const wordChangeHandler = (event) => {
    setState({
      ...state,
      typedWord: event.target.value,
    });
  };

  const wordMatchHandler = () => {
    setState({
      ...state,
      gameState: DIFFERENT_GAME_STATE.SUCCESS,
    });

    props.onWordMatch();

    setTimeout(() => {
      giveNewWord();
    }, 1000);
  };

  const endTimerHandler = () => {
    setState({
      ...state,
      gameState: DIFFERENT_GAME_STATE.FAIL,
    });
    setTimeout(() => {
      props.onFailure();
    }, 1000);
  };

  return (
    <div className={classNames.GameArena}>
      {state.gameState === 'play' ? (
        <>
          <Timer
            onComplete={endTimerHandler}
            timeLeft={state.word.length / props.difficultyFactor}
          />
          <Word
            onMatch={wordMatchHandler}
            word={state.word}
            typedWord={state.typedWord}
          />
          <Input change={wordChangeHandler} name={state.typedWord} placeHolderText='Enter the words' />
        </>
      ) : (
        ''
      )}

      {state.gameState === DIFFERENT_GAME_STATE.SUCCESS ? (
        <div className={classNames.successText}>Good Job !</div>
      ) : (
        ''
      )}
    </div>
  );
};

Game.propTypes = {
  level: PropTypes.string,
  difficultyFactor: PropTypes.number,
  onWordMatch: PropTypes.func,
};

export default Game;
