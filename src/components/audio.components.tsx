import React, { memo } from "react";
import { useAudio } from "../libs/audio/useAudio";

function AudioComponents({ item }: { item: any }) {
  const { toggleAudio, time, setCurrentTime, isPlaying } = useAudio({
    src: item.src,
    duration: 400,
    id: item.id,
  });

  return (
    <div className={"flex items-center my-4"}>
      <img
        src={item.imgSrc}
        alt=""
        className={"w-28 h-28 inline-block rounded-full mx-3"}
      />
      <span onClick={toggleAudio} className={"mx-3"}>
        {isPlaying ? "pause" : "play"}
      </span>
      <div className={"flex flex-col"}>
        <p>{time.toFixed(0)}</p>
        <p>{item.title}</p>
        <br />
        <input
          className="audioRange w-full"
          type="range"
          min="0"
          value={time}
          step={0.1}
          max={400}
          defaultValue={0}
          onChange={(e) => {
            const val = +e.target.value;
            setCurrentTime(val);
            // AudioClass.setCurrentTime(val);
          }}
        />
      </div>
    </div>
  );
}

export default memo(AudioComponents, () => {
  return false;
});
