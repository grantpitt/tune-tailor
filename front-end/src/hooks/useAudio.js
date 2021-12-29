import { useState, useEffect, useRef, useCallback } from "react";
import useStateRef from "./useStateRef";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));

  const [playing, setPlaying, playingRef] = useStateRef(false);

  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const timeoutId = useRef(0);

  const play = () => !playing && setPlaying(true);
  const pause = () => playing && setPlaying(false);

  useEffect(() => {

    const tick = () => {
      setCurrentTime(audio.currentTime);
      if (playingRef.current) {
        const id = setTimeout(() => tick(), 1000);
        timeoutId.current = id;
      }
    };

    if (playing) {
      audio.play();
      tick();
    } else {
      audio.pause();
      clearTimeout(timeoutId.current);
    }
  }, [playing, audio, playingRef]);

  useEffect(() => {
    audio.duration && setDuration(audio.duration);
  }, [audio.duration]);

  const onEnd = useCallback(() => {
    setCurrentTime(audio.duration);
    setTimeout(() => {
      audio.play();
      audio.currentTime = 0;
      setCurrentTime(0);
    }, 250);
  }, [audio]);

  useEffect(() => {
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("ended", onEnd);
    };
  }, [audio, onEnd]);

  return {
    playing,
    play,
    pause,
    currentTime,
    duration,
  };
};

export default useAudio;
