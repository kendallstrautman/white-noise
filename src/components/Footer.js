import React from "react";
import AudioButton from "./AudioButton";
import TimerButton from "./TimerButton";

const Footer = () => {
  //timer stuff - TBD------------------------------------------------------
  const toggleTimer = () => {
    console.log("timer");
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
