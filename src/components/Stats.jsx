import React from 'react';

const Stats = ({ flips, gameWon }) => {
  return (
    <div>
      <p>Timer: 0:00</p>
      <p>{`Number of Flips: ${flips}`}</p>
      {gameWon && <p>You Win!</p>}
    </div>
  );
};

export default Stats;
