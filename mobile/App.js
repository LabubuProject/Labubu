import { Button, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Card from './components/Card';

export default function App() {
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

  // checking for matched cards and game completion
  useEffect(() => {
  if (selectedCards.length === 2) {
    const [firstCard, secondCard] = selectedCards;
    
    if (firstCard.number === secondCard.number) { 
      setMatchedCards(prev => [...prev, firstCard.number]);
      setSelectedCards([]);
      
      // Check for win condition
      if (matchedCards.length + 1 === gridSize) {
        setGameWon(true);
      }
    } else {
      const timeoutId = setTimeout(() => {
        setSelectedCards([]);
      }, 1000); 
      
      return () => clearTimeout(timeoutId);
    }
  }
}, [selectedCards]);

  

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
    pauseButton = null;
    resetButton = null;
  } else {
    pauseButton = (
      <Pressable
        onPress={() => setPaused(p => !p)}
        style={({ pressed }) => [
          styles.baseButton,
          paused ? styles.pausedState : styles.activeState,
          pressed && (paused ? styles.pausedPressed : styles.activePressed)
        ]}
      >
        <Text style={styles.pauseButtonText}>{paused ? 'Resume' : 'Pause'}</Text>
      </Pressable>
    );
    resetButton = (
      <Pressable
        onPress={handleReset}
        style={({ pressed }) => [
          styles.resetBase,
          pressed && styles.resetPressed
        ]}
      >
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </Pressable>
    );
  }
 
  return (
    <ImageBackground style={styles.container} source={require('./assets/background.png')}>
      <Header
        flips={numOfFlips}
        gameWon={gameWon}
        gameStarted={gameStarted}
        paused={paused}   
      />
      {gameStarted && (
        <View style={[styles.gridContainer, { width: dim * 96 + (dim - 1) * 16 }]}>
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
        </View>
      )}
      {pauseButton}
      {resetButton}
      {!gameStarted && (
        <View style={styles.menuContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Grid Size:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="6"
              min={2}
              max={8}
              onChangeText={(text) => setGridSize(Number(text))}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
            onPress={startGame}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </Pressable>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, 
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 20, 
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  input: {
    width: 64, 
    paddingHorizontal: 8, 
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 6, 
    borderWidth: 2,
    borderColor: '#f3f4f6', 
    
  },
  button: {
    width: 120,
    paddingVertical: 12, 
    backgroundColor: '#A1D6D4',
    borderRadius: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, 
  },
  buttonPressed: {
    backgroundColor: '#41A5A4',
  },
  buttonText: {
    fontSize: 18, 
    color: '#535A53',
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16, 
    justifyContent: 'center',
    padding: 16,
  },
  baseButton: {
    marginTop: 16,          
    paddingHorizontal: 16,  
    paddingVertical: 8,     
    borderRadius: 12,       
    shadowColor: '#000',    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,           
  },
  pausedState: {
    backgroundColor: '#A1D6D4',  
  },
  activeState: {
    backgroundColor: '#DD7F56',  
  },
  pausedPressed: {
    backgroundColor: '#637A31', 
  },
  activePressed: {
    backgroundColor: '#41A5A4', 
  },
  pauseButtonText: {
    color: 'white',        
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  resetBase: {
    marginTop: 16,          
    paddingHorizontal: 16,  
    paddingVertical: 8,     
    borderRadius: 12,       
    backgroundColor: '#EF476F',
    shadowColor: '#000',    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,           
  },
  resetPressed: {
    backgroundColor: '#D62839', 
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
