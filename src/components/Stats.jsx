import React, { useContext } from 'react';
import Timer from './Timer';
import { AuthContext } from '../AuthContext/AuthContext';

const Stats = ({ flips, gameWon, paused }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className='text-xl semibold bg-[#bbce8f] rounded-lg p-2 mb-1'>
      <Timer gameStarted={flips>0} gameWon={gameWon} paused={paused} />
      <p>{`Number of Flips: ${flips}`}</p>
      {gameWon && <p>{`You Win ${user.username}!`}</p>}
    </div>
  );
};

export default Stats;
