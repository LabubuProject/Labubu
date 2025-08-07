// src/components/MusicContext.jsx
import React, { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio("src/assets/the-child.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = () => {
    audioRef.current.loop = true;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ playMusic, pauseMusic, isPlaying }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
