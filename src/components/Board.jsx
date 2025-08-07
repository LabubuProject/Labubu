import React, { useEffect, useState } from 'react';
import Card from './Card';
import Header from './Header';
import { useAuth } from '../AuthContext/AuthContext';
import Scoreboard from './Scoreboard';

const Board = () => {
  const { user, logout } = useAuth();
  const [gridSize, setGridSize] = useState(6);
  const [board, setBoard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [numOfFlips, setNumOfFlips] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [dim, setDim] = useState();
  const [paused, setPaused] = useState(false);
  const imgArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [reset, setReset] = useState(false);
  // placeholder for scoreboard data
  const [users, setUsers] = useState([
    { username: 'player1', bestTime: '45s', highestLevel: 6 },
    { username: 'player2', bestTime: '32s', highestLevel: 8 },
  ]);

  /*  fetching the scoreboard data from the backend */
  useEffect(() => {
    const fetchScoreboard = async () => {
      try {
        const response = await fetch('/api/user/scoreboard');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('❌ Error fetching scoreboard:', err);
      }
    };
    fetchScoreboard();
  }, []);

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
    if (gameStarted && matchedCards.length === gridSize * 2) {
      setGameWon(true);
    }
  }, [matchedCards, gridSize, gameStarted]);

  /* check for if game is resetting */
  useEffect(() => {
    if (reset) {
      setBoard([]);
      setGridSize(6);
      setGameStarted(false);
      setSelectedCards([]);
      setGameWon(false);
      setMatchedCards([]);
      setNumOfFlips(0);
      setPaused(false);
      setReset(false);
      setDim([]);
    }
  }, [reset]);

  const startGame = (e) => {
    e.preventDefault();
    setGameStarted(true);
    const totalCards = gridSize * 2;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards);

    const imageAssign = assignImgHelper(imgArr, shuffledCards);
    const newShuffledCards = shuffledCards.map((number, index) => ({
      id: index,
      number,
      letter: imageAssign[number],
    }));
    setBoard(newShuffledCards);
    setDim(Math.ceil(Math.sqrt(newShuffledCards.length)));
  };

  const handleFlipCard = (index, value) => {
    if (paused) return;
    setNumOfFlips(numOfFlips + 1);
    const currCard = selectedCards.find((card) => card.index === index);

    if (!currCard && selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { index, number: value.number, letter: value.letter },
      ]);
    } else if (!currCard && selectedCards.length === 2) {
      setSelectedCards([{ index, number: value.number, letter: value.letter }]);
    }
  };

  const assignImgHelper = (imgArr, numArr) => {
    const uniqueNums = [...new Set(numArr)];
    const obj = {};

    for (let i = 0; i < uniqueNums.length; i++) {
      obj[uniqueNums[i]] = imgArr[i % imgArr.length];
    }
    return obj;
  };

  const handleReset = (e) => {
    startGame(e);
    setReset(true);
  };

  let pauseButton;
  let resetButton;
  if (!gameWon && numOfFlips === 0) {
    pauseButton = <></>;
    resetButton = <></>;
  } else {
    pauseButton = (
      <button
        onClick={() => setPaused((p) => !p)}
        className={`mt-4 px-4 py-2 text-white rounded-xl shadow ${
          paused
            ? 'bg-[#A1D6D4] hover:bg-[#637A31]'
            : 'bg-[#DD7F56] hover:bg-[#41A5A4]'
        }`}
      >
        {paused ? 'Resume' : 'Pause'}
      </button>
    );
    resetButton = (
      <button
        onClick={handleReset}
        className={
          'mt-4 px-4 py-2 text-white rounded-xl shadow transition bg-[#EF476F] hover:bg-[#D62839]'
        }
      >
        Reset Game
      </button>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
       { gameWon && <Scoreboard users={users} />}
      <Header
        flips={numOfFlips}
        gameWon={gameWon}
        gameStarted={gameStarted}
        paused={paused}
      />
      {gameStarted && (
        <>
          <div
            className='grid gap-4 justify-center'
            style={{
              gridTemplateColumns: `repeat(${dim}, 6rem)`,
              justifyContent: 'center',
            }}
          >
            {board.map((value, index) => (
              <Card
                key={index}
                index={index}
                value={value.number}
                letter={value.letter}
                selectedCards={selectedCards}
                matchedCards={matchedCards}
                onClick={() => handleFlipCard(index, value)}
                /* when we add parameters to the handleFlipCard function, it will be immediately 
                  invoked when a card component renders. To avoid this, we pass the arrow function as
                  the function reference to the onclick handler, now the function will only run on click */
              />
            ))}
          </div>
        </>
      )}
      {pauseButton}
      {resetButton}
      {!gameStarted && (
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex items-center space-x-2 bg-transparent'>
            <label
              htmlFor='grid-size'
              className='text-xl text-white text-shadow-lg/10'
            >
              Enter Grid Size:
            </label>
            <input
              id='grid-size'
              type='number'
              placeholder='6'
              min={2}
              max={8}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className='w-16 px-2 py-1 border-2 bg-white rounded-md border-gray-100 focus:border-teal-500 focus:outline-none'
            />
          </div>
          <button
            className='w-30 py-3 text-lg bg-[#A1D6D4] rounded-lg transition shadow-sm text-[#535A53] hover:bg-[#41A5A4]'
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}
      {user && (
        <button
          onClick={logout}
          className='mt-4 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition'
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default Board;
