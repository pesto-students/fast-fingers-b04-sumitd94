import React from 'react';
import classNames from './Scorecard.module.css';

const Scorecard = (props) => {
  return (
    <div className={classNames.scoreCard}>
      <span className={classNames.scoreCardTitle}>SCORE BOARD</span>

      {props.previousGames.map((game,index) => (
        <div className={classNames.score} key={index}>
          {props.bestGame === game.gameName && (
            <span className={classNames.bestScore}>PERSONAL BEST</span>
          )}
          <span className={classNames.scoreData}>
            {game.gameName} : {game.gameTime}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Scorecard;
