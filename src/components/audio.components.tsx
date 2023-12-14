import React, { memo } from "react";
import { useAudio } from "../libs/audio/useAudio";
import { fancyTimeFormat } from "../libs/audio/dates";

function AudioComponents({ item }: { item: any }) {
  const { toggleAudio, time, setCurrentTime, isPlaying, duration } = useAudio({
    src: item.src,
    id: item.id,
  });

  return (
    <div className={"flex items-center my-4"}>
      <img
        src={item.imgSrc}
        alt=""
        className={"w-28 h-28 inline-block rounded-full mx-3"}
      />
      <span onClick={toggleAudio} className={"mx-3 block w-[50px]"}>
        {isPlaying ? "pause" : "play"}
      </span>
      <div className={"flex flex-col"}>
        <p>{item.title}</p>
        <div>
          <input
            className="audioRange w-full"
            type="range"
            min="0"
            value={time}
            step={0.1}
            max={duration}
            defaultValue={0}
            onChange={(e) => {
              const val = +e.target.value;
              setCurrentTime(val);
            }}
          />
          {fancyTimeFormat(time)} / {fancyTimeFormat(duration)}
        </div>
      </div>
    </div>
  );
}

export default memo(AudioComponents, () => {
  return false;
});
