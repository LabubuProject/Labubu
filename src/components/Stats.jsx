import React from 'react';

const Stats = ({ flips, gameWon, gameStarted }) => {
  //use gameStarted for timer logic?
  //add user name to win message?
  return (
    <div className='text-center'>
      <p className='text-xl semibold bg-[#bbce8f] rounded-lg p-2 mb-1'>
        {`Timer: 0:00   Flips: ${flips}`}
      </p>
    </div>
  );
};

export default Stats;
