import React, { useState, useEffect } from "react";
import ReactHowler from "react-howler";
import PropTypes from "prop-types";

const Noise = props => {
  const [isPlaying, setIsPlaying] = useState(false);

  function thisIsPlaying() {
    return props.colorPlaying == props.color ? true : false;
  }

  function handlePlaySound() {
    thisIsPlaying() ? setIsPlaying(true) : setIsPlaying(false);
  }

  function handleActiveStyles() {
    const thisNoiseElem = document.getElementById(`${props.color}`);
    if (thisIsPlaying() == true && props.isNoisePlaying == true) {
      thisNoiseElem.classList.add("--isPlaying");
      thisNoiseElem.classList.remove("--isBlur");
    } else if (thisIsPlaying() == false && props.isNoisePlaying == true) {
      thisNoiseElem.classList.add("--isBlur");
      thisNoiseElem.classList.remove("--isPlaying");
    } else {
      thisNoiseElem.classList.remove("--isPlaying");
      thisNoiseElem.classList.remove("--isBlur");
    }
  }

  function handleActiveState() {
    handlePlaySound();
    handleActiveStyles();
  }

  useEffect(handleActiveState);

  return (
    <div className="noise">
      <ReactHowler
        src={`../assets/${props.color}.wav`}
        playing={isPlaying}
        loop={true}
      />
      <h1 id={props.color} className={props.color}>
        {props.color}
      </h1>
    </div>
  );
};

Noise.propTypes = {
  color: PropTypes.string.isRequired,
  isNoisePlaying: PropTypes.bool.isRequired,
  colorPlaying: PropTypes.string
};

export default Noise;
