import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Timer from "../../components/timer/Timer";
import Word from "../../components/word/Word";
import { ResizeContext } from "../../contexts/resizeContext";
import { getRandomWordFromDictionary } from "../../utils/dictionary";
import "./Game.css";

const DIFFERENT_GAME_STATE = {
  PLAY: "play",
  SUCCESS: "success",
  READY: "ready",
  FAIL: "fail",
};

const EASY_WORDS_LENGTH = [2, 3, 4];
const MEDIUM_WORDS_LENGTH = [5, 6, 7, 8];
const HARD_WORDS_LENGTH = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Game(props) {
  const [state, setState] = useState({
    word: "",
    typedWord: "",
    gameState: DIFFERENT_GAME_STATE.READY,
    introText: 1,
  });

  const { isWideScreen } = useContext(ResizeContext);

  useEffect(() => {
    setTimeout(() => {
      giveNewWord();
    }, 3000);

    setTimeout(() => {
      setState({
        ...state,
        introText: 2,
      });
    }, 1000);

    setTimeout(() => {
      setState({
        ...state,
        introText: 3,
      });
    }, 2000);

    // eslint-disable-next-line
  }, []);

  const getWordLength = () => {
    if (props.difficultyFactor < 1.5) {
      return EASY_WORDS_LENGTH[
        parseInt(Math.random() * 10) % EASY_WORDS_LENGTH.length
      ];
    } else if (props.difficultyFactor >= 1.5 && props.difficultyFactor < 2) {
      return MEDIUM_WORDS_LENGTH[
        parseInt(Math.random() * 10) % MEDIUM_WORDS_LENGTH.length
      ];
    } else {
      return HARD_WORDS_LENGTH[
        parseInt(Math.random() * 10) % HARD_WORDS_LENGTH.length
      ];
    }
  };

  function giveNewWord() {
    const word = getRandomWord();
    setState({
      ...state,
      word,
      typedWord: "",
      gameState: DIFFERENT_GAME_STATE.PLAY,
    });
  }

  function inputChanged(value) {
    setState({
      ...state,
      typedWord: value,
    });
  }

  function getRandomWord() {
    const wordLength = getWordLength();
    return getRandomWordFromDictionary(wordLength);
  }

  function onTimerComplete() {
    setState({
      ...state,
      gameState: DIFFERENT_GAME_STATE.FAIL,
    });
    setTimeout(() => {
      props.onFailure && props.onFailure();
    }, 1000);
  }

  function onWordMatch() {
    setState({
      ...state,
      gameState: DIFFERENT_GAME_STATE.SUCCESS,
    });
    props.onSuccess && props.onSuccess();

    setTimeout(() => {
      giveNewWord();
    }, 1000);
  }

  return (
    <div className={`App-Game ${isWideScreen ? "wide-screen" : ""}`}>
      {state.gameState === DIFFERENT_GAME_STATE.PLAY && (
        <>
          <Timer
            onComplete={onTimerComplete}
            timeInSec={state.word.length / props.difficultyFactor}
          />
          <Word
            onMatch={onWordMatch}
            word={state.word}
            typedWord={state.typedWord}
          />
          <Input style={{ textAlign: "center" }} onKeyUp={inputChanged} />
        </>
      )}

      {state.gameState === DIFFERENT_GAME_STATE.SUCCESS && (
        <div>Good Job !</div>
      )}

      {state.gameState === DIFFERENT_GAME_STATE.FAIL && (
        <>
          <div>Oops!</div>
        </>
      )}
    </div>
  );
}

export default Game;
