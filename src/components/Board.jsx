import React, { useState } from 'react';
import Card from './Card';

const Board = () => {
  const [board, setBoard] = useState(Array(6).fill(null));

  return (
    <div className='flex items-center justify-around'>
      {board.map((value, index) => (
        <Card key={index} value={value} />
      ))}
    </div>
  );
};

export default Board;
