import React, { useState } from "react";
import Noise from "./Noise";
import noiseData from "../config.js";

const NoiseMenu = () => {
  //stateful noise data-------------------------------------------------------------
  const [colorPlaying, setColorPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const updateColorPlaying = e => {
    const i = Object.keys(noiseData).indexOf(e.target.classList[0]);
    if (colorPlaying == null) {
      setIsPlaying(true);
      setColorPlaying(Object.keys(noiseData)[i]);
    } else if (colorPlaying == Object.keys(noiseData)[i]) {
      setIsPlaying(false);
      setColorPlaying(null);
    } else {
      setIsPlaying(true);
      setColorPlaying(Object.keys(noiseData)[i]);
    }
  };
  //rendering----------------------------------------------------------------------
  const renderNoises = () => {
    return (
      <div className="noises">
        {Object.keys(noiseData).map(noise => {
          return (
            <div className={noise} key={noise} onClick={updateColorPlaying}>
              <Noise
                color={noise}
                anyNoisePlaying={isPlaying}
                colorPlaying={colorPlaying}
              />
            </div>
          );
        })}
      </div>
    );
  };
  return <section className="noise-menu">{renderNoises()}</section>;
};

export default NoiseMenu;
