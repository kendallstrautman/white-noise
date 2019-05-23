import React, { useState } from "react";
import Noise from "./Noise";
import noiseData from "../config.js";

const NoiseMenu = () => {
  //audio context setup-------------------------------------------------------------
  const [audioContext] = useState(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  async function getAudioFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
  async function setupAudio(filepath) {
    const sample = await getAudioFile(audioContext, filepath);
    return sample;
  }
  function createSample(audioBuffer) {
    //persistant sample ref stored in the closure for toggling
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.loop = true;
    return function toggleSample(isPlay) {
      isPlay ? sampleSource.start() : sampleSource.stop();
    };
  }
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
                setupAudio={setupAudio}
                createSample={createSample}
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
