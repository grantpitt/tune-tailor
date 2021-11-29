import { useState, useEffect, useRef } from "react";
import useStateRef from "./useStateRef";

import { Howl, Howler } from "howler";

const useAudio = (url) => {
  // const [audio] = useState(() => {
  //   let elem = new Audio(url);
  //   // elem.loop = true;
  //   // elem.autoplay = "";
  //   // elem.muted = "";
  //   // elem.playsinline = "";
  //   return elem;
  // });

  const [audio] = useState(
    new Howl({
      src: url,
      html5: true,
    })
  );

  const [playing, setPlaying, playingRef] = useStateRef(false);

  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const timeoutId = useRef(0);

  const toggle = () => setPlaying(!playing);
  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  const tick = () => {
    console.log("ticking");
    setCurrentTime(audio.pos());
    if (playingRef.current) {
      const id = setTimeout(() => tick(), 1000);
      timeoutId.current = id;
    }
  };

  console.log(audio);

  useEffect(() => {
    console.log("trying to play:", playing);
    if (playing) {
      audio.play();
      tick();
    } else {
      clearTimeout(timeoutId.current);
      audio.pause();
    }
  }, [playing]);

  // const onLoadedMetadata = (event) => setDuration(event.target.duration);

  const onLoad = () => setDuration(audio.duration());

  useEffect(() => {
    audio.on("load", onLoad);
    return () => {
      audio.off("load", onLoad);
    };
  }, []);

  // useEffect(() => {
  //   audio.addEventListener("loadedmetadata", onLoadedMetadata);
  //   return () => {
  //     audio.removeEventListener("loadedmetadata", onLoadedMetadata);
  //   };
  // }, []);


  // const onEnded = () => {
  //   setCurrentTime(audio.duration);
  //   setTimeout(() => {
  //     audio.play();
  //     audio.currentTime = 0;
  //     setCurrentTime(0);
  //   }, 250);
  // };
  const onEnd = () => {
    setCurrentTime(audio.duration());
    setTimeout(() => {
      audio.play();
      audio.pos(0);
      setCurrentTime(0);
    }, 250);
  };

  useEffect(() => {
    audio.on("end", onEnd);
    return () => {
      audio.off("end", onEnd);
    };
  }, []);

  // useEffect(() => {
  //   audio.addEventListener("ended", onEnded);
  //   return () => {
  //     audio.removeEventListener("ended", onEnded);
  //   };
  // }, []);

  return {
    playing,
    toggle,
    play,
    pause,
    currentTime,
    duration,
  };
};

export default useAudio;
