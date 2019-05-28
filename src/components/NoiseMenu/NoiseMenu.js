import React, { useState, useEffect } from "react";
import Noise from "./Noise";
import noiseData from "../../config/noise_data.js";
import PropTypes from "prop-types";

const NoiseMenu = props => {
  //funcs & state---------------------------------------------------------
  const [colorPlaying, setColorPlaying] = useState(null);
  const [isNoisePlaying, setIsNoisePlaying] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  function updateColorPlaying(e) {
    const i = Object.keys(noiseData).indexOf(e.target.classList[0]);
    const currentColor = Object.keys(noiseData)[i];

    if (colorPlaying == null) {
      setIsNoisePlaying(true);
      setColorPlaying(currentColor);
    } else if (colorPlaying == currentColor) {
      setIsNoisePlaying(false);
      setColorPlaying(null);
    } else {
      setIsNoisePlaying(true);
      setColorPlaying(currentColor);
    }
  }

  function killTimer() {
    //send props to kids to stop playback
    setIsNoisePlaying(false);
    setColorPlaying(null);
    //reset timer from root
    props.setTimerLength(0);
    setIsTimerRunning(false);
  }

  function minutesToMs(minutes) {
    return minutes * 60000;
  }

  function startTimer(atTime) {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      atTime = minutesToMs(atTime);
      window.setTimeout(killTimer, atTime);
    }
  }

  function renderNoises() {
    return (
      <div className="noises">
        {Object.keys(noiseData).map(noise => {
          return (
            <div className={noise} key={noise} onClick={updateColorPlaying}>
              <Noise
                color={noise}
                isNoisePlaying={isNoisePlaying}
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
    isNoisePlaying &&
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
