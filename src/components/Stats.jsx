import React from 'react';
import Timer from './Timer';
const Stats = ({ flips, gameWon}) => {
  //add user name to win message?
  return (
    <div className='text-xl semibold bg-[#bbce8f] rounded-lg p-2 mb-1'>
      <Timer gameStarted={flips>0} gameWon={gameWon} />
      <p>{`Number of Flips: ${flips}`}</p>
      {gameWon && <p>You Win!</p>}
    </div>
  );
};

export default Stats;
