import React from 'react';
import Stats from './Stats.jsx';

const Header = ({ flips, gameWon, gameStarted, paused }) => {
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <h1 className='text-[min(10vw,50px)] font-semibold mb-8 text-white text-shadow-lg/30 '>
        Labu Who?
      </h1>
      {gameStarted && <Stats flips={flips} gameWon={gameWon} paused={paused} />}
    </div>
  );
};

export default Header;
