import { useEffect, useState } from 'react';
import { View, Text } from 'react-native'

function formatTime(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const Timer = ({ gameStarted, gameWon, paused }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (gameStarted && !gameWon && !paused) {
      intervalId = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameStarted, gameWon, paused]);

  useEffect(() => {
    if (!gameStarted) {
      setSeconds(0);
    }
  }, [gameStarted]);

  return <Text>Timer: {formatTime(seconds)}</Text>;
}
export default Timer