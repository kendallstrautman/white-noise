import React, { useState, useEffect } from "react";
import Noise from "./Noise";
import noiseData from "../../config/noise_data.js";
import PropTypes from "prop-types";

const NoiseMenu = props => {
  //funcs & state---------------------------------------------------------
  const [colorPlaying, setColorPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  function updateColorPlaying(e) {
    const i = Object.keys(noiseData).indexOf(e.target.classList[0]);
    const currentColor = Object.keys(noiseData)[i];

    if (colorPlaying == null) {
      setIsPlaying(true);
      setColorPlaying(currentColor);
    } else if (colorPlaying == currentColor) {
      setIsPlaying(false);
      setColorPlaying(null);
    } else {
      setIsPlaying(true);
      setColorPlaying(currentColor);
    }
  }

  function killTimer() {
    //send props to kids to stop playback
    setIsPlaying(false);
    setColorPlaying(null);
    //reset timer from root
    props.setTimerLength(0);
    setTimerIsRunning(false);
  }

  function minutesToMs(minutes) {
    return minutes * 60000;
  }

  function startTimer(atTime) {
    setTimerIsRunning(true);
    atTime = minutesToMs(atTime);
    window.setTimeout(killTimer, atTime);
  }

  function renderNoises() {
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
  }
  //Hook-----------------------------------------------------------------

  useEffect(() => {
    isPlaying &&
      props.timerLength > 0 &&
      !timerIsRunning &&
      startTimer(props.timerLength);
  });

  //Render---------------------------------------------------------------

  return <section className="noise-menu">{renderNoises()}</section>;
};

NoiseMenu.propTypes = {
  timerLength: PropTypes.number.isRequired,
  setTimerLength: PropTypes.func.isRequired
};

export default NoiseMenu;
