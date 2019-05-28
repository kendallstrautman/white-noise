import React from "react";

const Timer = props => {
  function handleSetTimer(e) {
    const time = e.target.value;
    props.setTimerLength(time);
  }
  return (
    <div className="timer --isHidden">
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

export default Timer;
