import React from "react";
import AudioButton from "./AudioButton";
import TimerButton from "./TimerButton";
import PropTypes from "prop-types";

const Footer = props => {
  function toggleTimer() {
    props.visibleTab !== "timer"
      ? props.setVisibleTab("timer")
      : props.setVisibleTab("menu");
  }
  function toggleInfo() {
    props.visibleTab !== "info"
      ? props.setVisibleTab("info")
      : props.setVisibleTab("menu");
  }
  return (
    <section className="footer">
      <footer className="icons">
        <div onClick={toggleTimer}>
          <TimerButton />
        </div>
        <div onClick={toggleInfo}>
          <AudioButton />
        </div>
      </footer>
    </section>
  );
};

Footer.propTypes = {
  visibleTab: PropTypes.string.isRequired,
  setVisibleTab: PropTypes.func.isRequired
};

export default Footer;
