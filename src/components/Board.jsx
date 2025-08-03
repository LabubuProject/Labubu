import React, { useEffect, useState } from 'react';
import Stats from './Stats';
import Card from './Card';

const Board = () => {
  const [gridSize, _setGridSize] = useState(3); //creating in anticipation of game levels
  const [board, setBoard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [numOfFlips, setNumOfFlips] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  /* checking for matched cards every time two cards are selected */
  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].number === selectedCards[1].number
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  /* checking for game completion every time a match is made */
  useEffect(() => {
    if (gameStarted && matchedCards.length === gridSize * 2) {
      setGameWon(true);
      //TO-DO: create http post request to users db with total flips and timer(placeholder)
    }
  }, [matchedCards, gridSize, gameStarted, gameWon]);

  const startGame = (e) => {
    e.preventDefault();
    setGameStarted(true);
    const totalCards = gridSize * 2;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers] //copying numbers so each one appears twice
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setBoard(shuffledCards);

    //may need these if we have restart button or multiple levels
    // setSelectedCards([]);
    // setMatchedCards([]);
    // setGameWon(false);
  };

  const handleFlipCard = (index, value) => {
    setNumOfFlips(numOfFlips + 1);
    //check if card at index is already in array
    const currCard = selectedCards.find((card) => card.index === index);

    //setseleted cards max length is 2
    if (!currCard && selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { index, number: value.number },
      ]);
    } else if (!currCard && selectedCards.length === 2) {
      setSelectedCards([{ index, number: value.number }]);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      {gameStarted && (
        <div className='flex flex-col items-center justify-center mt-10'>
          <Stats flips={numOfFlips} gameWon={gameWon} />
          <div className='grid grid-cols-3 gap-2'>
            {board.map((value, index) => (
              <Card
                key={index}
                index={index}
                value={value.number}
                selectedCards={selectedCards}
                matchedCards={matchedCards}
                onClick={() => handleFlipCard(index, value)}
                /* when we add parameters to the handleFlipCard function, it will be immediately 
                invoked when a card component renders. To avoid this, we pass the arrow function as
                the function reference to the onclick handler, now the function will only run on click */
              />
            ))}
          </div>
        </div>
      )}
      {!gameStarted && (
        <button className='rounded-lg bg-green w-30 h-10' onClick={startGame}>
          StartGame
        </button>
      )}
    </div>
  );
};

export default Board;
