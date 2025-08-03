import React from 'react';

const Stats = ({ flips, gameWon, gameStarted }) => {
  //use gameStarted for timer logic?
  //add user name to win message?
  return (
    <div className='text-center'>
      <p>Timer: 0:00</p>
      <p>{`Number of Flips: ${flips}`}</p>
      {gameWon && <p>You Win!</p>}
    </div>
  );
};

export default Stats;
