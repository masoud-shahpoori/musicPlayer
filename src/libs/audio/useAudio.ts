import { useEffect, useRef, useState } from "react";
import { AudioSingleton } from "./audioSingleton";

export function useAudio({ src = "", id }: { src?: string; id: string }): {
  toggleAudio: () => void;
  time: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  duration: number;
} {
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audio = AudioSingleton.getInstance(id);
  const handleTimeUpdate = (time: number) => {
    setTime(time);
  };

  const handleEvent = (e: Event) => {
    switch (e.type) {
      case "timeupdate": {
        const newTime = Math.floor(controllerRef.current.currentTime || 0);
        handleTimeUpdate(newTime);
        break;
      }
      case "ended": {
        setTime(0);
        break;
      }
      case "play": {
        setIsPlaying(true);

        AudioSingleton.pauseAllAudioExcept(id);

        break;
      }
      case "pause": {
        setIsPlaying(false);
        break;
      }
      case "loadeddata": {
        console.log("#music loaded ", id, audio.duration);
        setDuration(audio.duration);
      }

      default:
        () => {};
    }
  };

  const controllerRef = useRef<any>();

  const handleSetAudioHandler = () => {
    audio.addEventListener("timeupdate", handleEvent);
    audio.addEventListener("play", handleEvent);
    audio.addEventListener("pause", handleEvent);
    audio.addEventListener("loadstart", handleEvent);
    audio.addEventListener("loadeddata", handleEvent);
    audio.addEventListener("playing", handleEvent);
    audio.addEventListener("ended", handleEvent);
  };

  const handleRemoveAudioHandler = () => {
    audio.removeEventListener("timeupdate", handleEvent);
    audio.removeEventListener("play", handleEvent);
    audio.removeEventListener("pause", handleEvent);
    audio.removeEventListener("loadstart", handleEvent);
    audio.removeEventListener("loadeddata", handleEvent);
    audio.removeEventListener("playing", handleEvent);
    audio.removeEventListener("ended", handleEvent);
  };

  useEffect(() => {
    if (!audio.paused) {
      setIsPlaying(true);
    }
    controllerRef.current = audio;
    if (audio.currentTime !== 0) {
      setTime(audio.currentTime);
    }
    handleSetAudioHandler();
  }, []);

  useEffect(() => {
    if (audio.paused && controllerRef.current && audio.currentTime === 0)
      controllerRef.current.src = src;
  }, [src]);

  useEffect(() => {
    return () => {
      handleRemoveAudioHandler();
    };
  }, []);

  const toggleAudio = () => {
    if (audio.paused) {
      controllerRef.current.play();
    } else {
      controllerRef.current.pause();
    }
  };

  const setCurrentTime = (time: number) => {
    setTime(time);
    if (controllerRef.current) controllerRef.current.currentTime = time;
  };

  //you can have next and prev in your project

  return { toggleAudio, time, setCurrentTime, isPlaying, duration };
}
