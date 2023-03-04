import { useCallback, useEffect, useRef, useState } from "react";
import { AudioMain } from "./audio";
import { createCallbackManager } from "../callbacks";
const audioInstance = new AudioMain();

const { addCallback, removeCallback, runCallbacks, callbacks } =
  createCallbackManager();

interface AudioTypeInterface {
  type: "play" | "pause" | "downloading";
  messageId: string;
  time?: number;
}
export function useAudio({
  src = "",
  duration = 0,
  id,
}: {
  src?: string;
  duration?: number;
  id: string;
}): {
  toggleAudio: () => void;
  time: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
} {
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  let intervalIDRef: any;

  const listener = (e: AudioTypeInterface) => {
    if (e.type === "play") {
      if (e.messageId === id) {
        audioInstance.src = src;
        audioInstance.setCurrentTime(e.time || time);
        audioInstance.play();
        setIsPlaying(true);
        updateTime();
      } else {
        setIsPlaying(false);
        clearInterval(intervalIDRef);
      }
    }
    if (e.type === "pause") {
      if (e.messageId === id) {
        audioInstance.pause();
        setIsPlaying(false);
        clearInterval(intervalIDRef);
        setTime(audioInstance.getCurrentTime());
      }
    }
    if (e.type === "downloading") alert("downloading");
  };

  useEffect(() => {
    addCallback(listener);
  }, []);

  // useEffect(() => {
  //   clearInterval(intervalIDRef);
  //   // setIsPlaying(false);
  //   audioInstance.src = src;
  //
  //   // if (src !== "") {
  //   //   toggleAudio();
  //   // }
  // }, [src]);

  useEffect(() => {
    if (duration <= time) {
      clearInterval(intervalIDRef);
      audioInstance.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [time]);

  const toggleAudio = () => {
    if (!isPlaying) {
      runCallbacks({ type: "play", messageId: id, time } as AudioTypeInterface);
    } else {
      runCallbacks({
        type: "pause",
        messageId: id,
        time,
      } as AudioTypeInterface);
    }
  };

  const updateTime = () => {
    intervalIDRef = setInterval(() => {
      setTime((prev) => {
        return prev + 0.1;
      });
    }, 100);
  };
  const setCurrentTime = (time: number) => {
    setTime(time);
    audioInstance.setCurrentTime(time);
  };

  return { toggleAudio, time, setCurrentTime, isPlaying };
}
