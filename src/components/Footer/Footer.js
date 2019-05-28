import React from "react";
import AudioButton from "./AudioButton";
import TimerButton from "./TimerButton";

const Footer = props => {
  function toggleTimer() {
    const timer = document.querySelector(".timer");
    const info = document.querySelector(".info");
    const noiseMenu = document.querySelector(".noise-menu");
    if (props.tabIsVisible !== "timer") {
      timer.classList.remove("--isHidden");
      timer.classList.add("--isActive");
      noiseMenu.classList.remove("--isActive");
      noiseMenu.classList.add("--isHidden");
      info.classList.remove("--isActive");
      info.classList.add("--isHidden");
      props.setTabIsVisible("timer");
    } else {
      timer.classList.remove("--isActive");
      timer.classList.add("--isHidden");
      info.classList.remove("--isActive");
      info.classList.add("--isHidden");
      noiseMenu.classList.remove("--isHidden");
      noiseMenu.classList.add("--isActive");
      props.setTabIsVisible("menu");
    }
  }
  function toggleInfo() {
    const timer = document.querySelector(".timer");
    const info = document.querySelector(".info");
    const noiseMenu = document.querySelector(".noise-menu");
    if (props.tabIsVisible !== "info") {
      info.classList.remove("--isHidden");
      info.classList.add("--isActive");
      timer.classList.add("--isHidden");
      timer.classList.remove("--isActive");
      noiseMenu.classList.remove("--isActive");
      noiseMenu.classList.add("--isHidden");
      props.setTabIsVisible("info");
    } else {
      info.classList.remove("--isActive");
      info.classList.add("--isHidden");
      timer.classList.remove("--isActive");
      timer.classList.add("--isHidden");
      noiseMenu.classList.remove("--isHidden");
      noiseMenu.classList.add("--isActive");
      props.setTabIsVisible("menu");
    }
  }
  return (
    <footer>
      <div className="icons">
        <div onClick={toggleTimer}>
          <TimerButton />
        </div>
        <div onClick={toggleInfo}>
          <AudioButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
