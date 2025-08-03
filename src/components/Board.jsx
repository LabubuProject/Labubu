import React, { useState } from 'react';
import Card from './Card';

const Board = () => {
  const [board, setBoard] = useState(Array(6).fill(null));

  return (
    <div className='grid grid-cols-3 gap-2'>
      {board.map((value, index) => (
        <Card key={index} value={value} />
      ))}
    </div>
  );
};

export default Board;
