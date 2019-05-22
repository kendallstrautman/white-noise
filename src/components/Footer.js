import React, { useState } from "react";
import AudioButton from "./AudioButton";
import TimerButton from "./TimerButton";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleTimer = () => {
    const timer = document.querySelector(".timer");
    if (!isVisible) {
      timer.classList.remove("--isHidden");
      timer.classList.add("--isActive");
      setIsVisible(true);
    } else {
      timer.classList.remove("--isActive");
      timer.classList.add("--isHidden");
      setIsVisible(false);
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
