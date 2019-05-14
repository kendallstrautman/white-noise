import React, { useState, useEffect } from "react";

const Noise = props => {
  const [noise, setNoise] = useState();
  const handleNoise = props => {
    if (props.color == "brown") {
      setNoise(new Audio(require("../assets/brown.mp3")));
    } else if (props.color == "pink") {
      setNoise(new Audio(require("../assets/pink.mp3")));
    } else if (props.color == "white") {
      setNoise(new Audio(require("../assets/white-noise.mp3")));
    } else if (props.color == "blue") {
      setNoise(new Audio(require("../assets/blue.mp3")));
    } else if (props.color == "violet") {
      setNoise(new Audio(require("../assets/purple.mp3")));
    } else if (props.color == "grey") {
      setNoise(new Audio(require("../assets/gray.mp3")));
    }
  };

  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    if (playing) {
      noise.play();
    } else {
      noise.pause();
    }
    setPlaying(!playing);
  };
  useEffect(() => {
    handleNoise(props);
  }, []);

  return (
    <div className="noise" onClick={toggle}>
      <h1 className={props.color}>{props.color}</h1>
    </div>
  );
};

export default Noise;
