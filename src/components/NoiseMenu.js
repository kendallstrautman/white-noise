import React, { useState, useEffect } from "react";
import Noise from "./Noise";
import noiseData from "../config.js";

const NoiseMenu = props => {
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
  const stopPlaying = () => {
    console.log("stop playing");
    //send props to kids to handle stop
    setIsPlaying(false);
    setColorPlaying(null);
  };
  function minutesToMs(minutes) {
    return minutes * 60000;
  }
  const startTimer = atTime => {
    console.log("starting timer");
    atTime = minutesToMs(atTime);
    console.log(atTime);
    window.setTimeout(stopPlaying, atTime);
  };
  useEffect(() => {
    isPlaying && props.timerLength > 0 && startTimer(props.timerLength);
  });
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
