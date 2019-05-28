import React from "react";
import PropTypes from "prop-types";

const Timer = props => {
  function handleSetTimer(e) {
    const time = e.target.value;
    props.setTimerLength(time);
  }

  return (
    <div
      className={`timer  ${
        props.visibleTab == "timer" ? "--isActive" : "--isHidden"
      }`}
    >
      <label>
        Time in Minutes <br />
        <input
          type="number"
          value={props.timerLength}
          onChange={handleSetTimer}
        />
      </label>
    </div>
  );
};

Timer.propTypes = {
  timerLength: PropTypes.number.isRequired,
  setTimerLength: PropTypes.func.isRequired,
  visibleTab: PropTypes.string.isRequired
};

export default Timer;
