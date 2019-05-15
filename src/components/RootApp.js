import React, { useState } from "react";
import Noise from "./Noise";
import Footer from "./Footer";

const RootApp = () => {
  const [noises] = useState({
    brown: new Audio(require("../assets/brown.mp3")),
    pink: new Audio(require("../assets/pink.mp3")),
    white: new Audio(require("../assets/white-noise.mp3")),
    blue: new Audio(require("../assets/blue.mp3")),
    violet: new Audio(require("../assets/purple.mp3")),
    grey: new Audio(require("../assets/gray.mp3"))
  });
  const [playing, setPlaying] = useState(true);
  const [colorPlaying, setColorPlaying] = useState(null);
  const toggle = e => {
    const i = Object.keys(noises).indexOf(e.target.id);
    const noisePlaying = Object.values(noises)[i];
    const color = Object.keys(noises)[i];
    setColorPlaying(color);
    Object.values(noises).map(noise => {
      noise !== noisePlaying && noise.pause();
    });
    if (color !== colorPlaying) {
      noisePlaying.play();
      setPlaying(false);
    } else {
      if (playing) {
        setPlaying(false);
        noisePlaying.play();
      } else {
        setPlaying(true);
        noisePlaying.pause();
      }
    }
  };
  const createNoises = () => {
    return (
      <section className="noises">
        {Object.keys(noises).map(noise => {
          return (
            <div onClick={toggle}>
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
      <Footer />
    </main>
  );
};

export default RootApp;
