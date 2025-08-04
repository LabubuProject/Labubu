import React from 'react';
import Stats from './Stats.jsx';

const Header = ({ flips, gameWon, gameStarted }) => {
  //hamburger menu?
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <h1 className='text-3xl font-semibold mb-8 text-white text-shadow-lg/30'>
        Labu Who?
      </h1>
      {gameStarted && (
        <Stats flips={flips} gameWon={gameWon} gameStarted={gameStarted} />
      )}
    </div>
  );
};

export default Header;
