import React, { useEffect, useState } from 'react';
import Card from './Card';
import Header from './Header';

const Board = () => {
  const [gridSize, _setGridSize] = useState(6); //creating in anticipation of game levels
  const [board, setBoard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [numOfFlips, setNumOfFlips] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [paused, setPaused] = useState(false);
  const imgArr = ['A', 'B', 'C', 'D'];

  console.log(board);
  /* checking for matched cards every time two cards are selected */
  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0].letter === selectedCards[1].letter) {
        setMatchedCards((prevMatchedCards) => [
          ...prevMatchedCards,
          ...selectedCards,
        ]);
        setSelectedCards([]);
      } else {
        const timeoutId = setTimeout(() => {
          setSelectedCards([]);
        }, 800);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedCards]);

  /* checking for game completion every time a match is made */
  useEffect(() => {
    console.log(matchedCards);
    if (gameStarted && matchedCards.length === gridSize * 2) {
      console.log('win');
      setGameWon(true);
      //TO-DO: create http PUT request to users db with total flips and timer(placeholder)
    }
  }, [matchedCards, gridSize, gameStarted, gameWon]);

  const startGame = (e) => {
    e.preventDefault();
    setGameStarted(true);
    const totalCards = gridSize * 2;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    //console.log(numbers);
    const shuffledCards = [...numbers, ...numbers] //copying numbers so each one appears twice
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards);
    //.map((number, index) => ({ id: index, number, letter: 'A'}));

    const imageAssign = assignImgHelper(imgArr, shuffledCards);
    const newShuffledCards = shuffledCards.map((number, index) => ({
      id: index,
      number,
      letter: imageAssign[number],
    }));
    setBoard(newShuffledCards);
    // const image
    //may need these if we have restart button or multiple levels
    // setSelectedCards([]);
    // setMatchedCards([]);
    // setGameWon(false);
  };

  const handleFlipCard = (index, value) => {
    if (paused) return;
    setNumOfFlips(numOfFlips + 1);
    //check if card at index is already in array
    const currCard = selectedCards.find((card) => card.index === index);

    //setseleted cards max length is 2
    if (!currCard && selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { index, number: value.number, letter: value.letter },
      ]);
    } else if (!currCard && selectedCards.length === 2) {
      setSelectedCards([{ index, number: value.number, letter: value.letter }]);
    }
  };

  //help function for assigning image letter of each card
  const assignImgHelper = (imgArr, numArr) => {
    const uniqueNums = [...new Set(numArr)];
    const obj = {};

    for (let i = 0; i < uniqueNums.length; i++) {
      obj[uniqueNums[i]] = imgArr[i % imgArr.length];
    }
    return obj;
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Header
        flips={numOfFlips}
        gameWon={gameWon}
        gameStarted={gameStarted}
        paused={paused}
      />
      {gameStarted && (
        <>
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 mb-6 overflow-hidden'>
            {board.map((value, index) => (
              <Card
                key={index}
                index={index}
                value={value.number}
                letter={value.letter}
                selectedCards={selectedCards}
                matchedCards={matchedCards}
                onClick={() => handleFlipCard(index, value)}
              />
            ))}
          </div>
          <button
            onClick={() => setPaused((p) => !p)}
            className={`mt-4 px-4 py-2 text-white rounded-xl shadow ${
              paused
                ? 'bg-[#8aa749] hover:bg-[#637A31]'
                : 'bg-[#DD7F56] hover:bg-[#dd906f]'
            }`}
          >
            {paused ? 'Resume' : 'Pause'}
          </button>
        </>
      )}
      {!gameStarted && (
        <button
          className='w-30 py-3 text-lg bg-[#A1D6D4] rounded-lg transition shadow-sm text-[#535A53] hover:bg-[#41A5A4]'
          onClick={startGame}
        >
          StartGame
        </button>
      )}
    </div>
  );
};

export default Board;
