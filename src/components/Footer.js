import React, { useState } from "react";
import AudioButton from "./AudioButton";
import TimerButton from "./TimerButton";

const Footer = () => {
  const [timerIsVisible, setTimerIsVisible] = useState(false);
  const toggleTimer = () => {
    const timer = document.querySelector(".timer");
    const noiseMenu = document.querySelector(".noise-menu");
    if (!timerIsVisible) {
      timer.classList.remove("--isHidden");
      timer.classList.add("--isActive");
      noiseMenu.classList.remove("is--active");
      noiseMenu.classList.add("is--hidden");
      setTimerIsVisible(true);
    } else {
      timer.classList.remove("--isActive");
      timer.classList.add("--isHidden");
      noiseMenu.classList.remove("is--hidden");
      noiseMenu.classList.add("is--active");
      setTimerIsVisible(false);
    }
  };
  const toggleAudio = () => {
    console.log("will handle audio setting here");
  };
  return (
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
  );
};

export default Footer;
