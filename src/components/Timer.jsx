import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';

function formatTime(totalSecs) {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const Timer = ({ gameStarted, gameWon, paused}) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (gameWon) {
      const updateUser = async () => {
        try {
          const res = await axios.put('api/user/updateuser', {
            username: user.username,
            bestTime: seconds,
            highestLevel: 1,
          });
          console.log(res.data);
        } catch (err) {
          console.log('error updating user', err);
        }
      };
      updateUser();
    }
  }, [gameWon]);
  
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

  return <p>Timer: {formatTime(seconds)}</p>;
};

export default Timer;
