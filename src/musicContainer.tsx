import React, { memo, useMemo } from "react";
import AudioComponents from "./components/audio.components";
import { musicList } from "./libs/constants/musicsList";

function MusicContainer() {
  const RenderMusic = useMemo(() => {
    return (
      <>
        {Object.values(musicList).map((item) => {
          return <AudioComponents item={item} key={item.id} />;
        })}
      </>
    );
  }, [musicList]);

  return <div className={"w-100"}>{RenderMusic}</div>;
}

export default memo(MusicContainer);
