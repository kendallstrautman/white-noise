import React, { useState, useEffect } from "react";

const Noise = props => {
  const [noise, setNoise] = useState(
    props
      .setupAudio(`../assets/${props.color}.wav`)
      .then(sample => props.createSample(sample))
  );
  const [canPause, setCanPause] = useState(false);

  const isPlaying = props => {
    return props.colorPlaying == props.color && true;
  };
  const handleSound = props => {
    if (isPlaying(props) && !canPause) {
      const play = true;
      setCanPause(true);
      noise.then(toggleSample => toggleSample(play));
    } else if (!isPlaying(props) && canPause) {
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

  useEffect(() => {
    handleSound(props);
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
