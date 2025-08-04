import React from 'react';
import Timer from './Timer';
const Stats = ({ flips, gameWon}) => {
  //add user name to win message?
  return (
    <div className='text-center'>
      <Timer gameStarted={flips>0} gameWon={gameWon} />
      <p>{`Number of Flips: ${flips}`}</p>
      {gameWon && <p>You Win!</p>}
    </div>
  );
};

export default Stats;
