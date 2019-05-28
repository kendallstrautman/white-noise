import React from "react";
import PropTypes from "prop-types";

const Timer = props => {
  function handleSetTimer(e) {
    const time = e.target.value;
    props.setTimerLength(time);
  }

  return (
    <div className={`timer  ${props.tabIsVisible !== "timer" && "--isHidden"}`}>
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
  tabIsVisible: PropTypes.string.isRequired
};

export default Timer;
