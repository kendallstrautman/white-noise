import React, { useState, useEffect } from "react";

const Noise = props => {
  const [noise, setNoise] = useState(
    props
      .setupAudio(`../assets/${props.color}.wav`)
      .then(sample => props.createSample(sample))
  );
  const [canPause, setCanPause] = useState(false);

  const thisIsPlaying = props => {
    return props.colorPlaying == props.color ? true : false;
  };
  const handleSound = props => {
    if (thisIsPlaying(props) && !canPause) {
      const play = true;
      setCanPause(true);
      noise.then(toggleSample => toggleSample(play));
    } else if (!thisIsPlaying(props) && canPause) {
      const pause = false;
      setCanPause(false);
      noise.then(toggleSample => toggleSample(pause));
      //reinstantiate noise instance after stopping
      setNoise(
        props
          .setupAudio(`../assets/${props.color}.wav`)
          .then(sample => props.createSample(sample))
      );
    }
  };
  const handleStyles = props => {
    const noiseElem = document.getElementById(`${props.color}`);
    if (thisIsPlaying(props) && props.anyNoisePlaying) {
      noiseElem.classList.add("--isPlaying");
      noiseElem.classList.remove("--isBlur");
    } else if (!thisIsPlaying(props) && props.anyNoisePlaying) {
      noiseElem.classList.add("--isBlur");
      noiseElem.classList.remove("--isPlaying");
    } else {
      noiseElem.classList.remove("--isPlaying");
      noiseElem.classList.remove("--isBlur");
    }
  };
  useEffect(() => {
    handleSound(props);
    handleStyles(props);
  });

  return (
    <div className="noise">
      <h1 id={props.color} className={props.color}>
        {props.color}
      </h1>
    </div>
  );
};

export default Noise;
