import React, { useState, useEffect } from "react";
import Noise from "./Noise";
import TimerButton from "./TimerButton";
import AudioButton from "./AudioButton";

const RootApp = () => {
  //audio context setup-------------------------------------------------------------
  const [audioContext] = useState(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const getAudioFile = async (audioContext, filepath) => {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };
  const setupAudio = async filepath => {
    const sample = await getAudioFile(audioContext, filepath);
    return sample;
  };
  const createSample = audioBuffer => {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.loop = true;
    return function toggleSample(isPlay) {
      isPlay ? sampleSource.start() : sampleSource.stop();
    };
  };
  //stateful noise data & instantiation----------------------------------------------
  const [noises, setNoises] = useState({
    brown: setupAudio("../assets/brown.mp3").then(sample =>
      createSample(sample)
    ),
    pink: setupAudio("../assets/pink.mp3").then(sample => createSample(sample)),
    white: setupAudio("../assets/white.mp3").then(sample =>
      createSample(sample)
    ),
    blue: setupAudio("../assets/blue.mp3").then(sample => createSample(sample)),
    violet: setupAudio("../assets/violet.mp3").then(sample =>
      createSample(sample)
    ),
    grey: setupAudio("../assets/grey.mp3").then(sample => createSample(sample))
  });
  const [playing, setPlaying] = useState(true);
  const [colorPlaying, setColorPlaying] = useState(null);
  const [noisePlaying, setNoisePlaying] = useState(null);
  //handle all pause/play of noises------------------------------------------------
  const toggleSound = e => {
    //get index & value of noise/color
    const i = Object.keys(noises).indexOf(e.target.classList[0]);
    const noise = Object.values(noises)[i];
    const color = Object.keys(noises)[i];
    setColorPlaying(color);
    setNoisePlaying(noise);
    //if the color changed, play new color & pause prev
    if (color !== colorPlaying) {
      setPlaying(false);
      if (noisePlaying) {
        noisePlaying && noisePlaying.then(toggleSample => toggleSample(false));
        setNoises({
          ...noises,
          [colorPlaying]: setupAudio("../assets/" + colorPlaying + ".mp3").then(
            sample => createSample(sample)
          )
        });
      }
      noise.then(toggleSample => toggleSample(true));
    } else {
      //regular play/pause toggle
      if (playing) {
        setPlaying(false);
        console.log("playing");
        noise.then(toggleSample => toggleSample(true));
      } else {
        setPlaying(true);
        noise.then(toggleSample => toggleSample(false));
        setNoises({
          ...noises,
          [color]: setupAudio("../assets/" + color + ".mp3").then(sample =>
            createSample(sample)
          )
        });
      }
    }
  };
  //timer stuff - TBD------------------------------------------------------
  const toggleTimer = () => {
    console.log("timer");
  };
  const toggleAudio = () => {
    console.log("will handle audio setting here");
  };
  //rendering---------------------------------------------------------------
  const createNoises = () => {
    return (
      <section className="noises">
        {Object.keys(noises).map(noise => {
          return (
            <div className={noise} key={noise} onClick={toggleSound}>
              <Noise color={noise} />
            </div>
          );
        })}
      </section>
    );
  };
  return (
    <main className="main">
      {createNoises()}
      <footer>
        <div className="icons">
          <div onClick={toggleTimer}>
            <TimerButton />
          </div>
          <div onClick={toggleAudio}>
            <AudioButton />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default RootApp;
