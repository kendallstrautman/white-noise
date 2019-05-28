import React, { useState, useEffect } from "react";
import ReactHowler from "react-howler";

const Noise = props => {
  const [canPause, setCanPause] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const thisIsPlaying = props => {
    return props.colorPlaying == props.color ? true : false;
  };
  const handleSound = props => {
    if (thisIsPlaying(props) && !canPause) {
      setIsPlaying(true);
      setCanPause(true);
    } else if (!thisIsPlaying(props) && canPause) {
      setIsPlaying(false);
      setCanPause(false);
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
      <ReactHowler
        src={`../assets/${props.color}.wav`}
        playing={isPlaying}
        loop={true}
        mute={!isPlaying}
      />
      <h1 id={props.color} className={props.color}>
        {props.color}
      </h1>
    </div>
  );
};

export default Noise;
