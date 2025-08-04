import React, { useState, useEffect } from "react";

function formatTime(totalSecs) {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const Timer = ({ gameStarted, gameWon }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;

    if (gameStarted && !gameWon) {
      intervalId = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (!gameStarted) {
      setSeconds(0);
    }
  }, [gameStarted]);

  return <p>Timer: {formatTime(seconds)}</p>;
};

export default Timer;
