import React from "react";
import PropTypes from "prop-types";

const Timer = props => {
  function handleSetTimer(e) {
    const time = e.target.value;
    props.setTimerLength(time);
  }

  return (
    <section
      className={`timer ${
        props.visibleTab == "timer" ? "--isActive" : "--isHidden"
      }`}
    >
      <div className="timer--wrap">
        <svg
          className="outer-circle"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="outer-circle__color" cx="50" cy="50" r="57" />
          <circle className="outer-circle__base" cx="50" cy="50" r="57" />
          <circle
            draggable="true"
            className="draggable-circle"
            cx="50"
            cy="-6"
            r="6"
          />
        </svg>
      </div>
    </section>
  );
};

Timer.propTypes = {
  timerLength: PropTypes.number.isRequired,
  setTimerLength: PropTypes.func.isRequired,
  visibleTab: PropTypes.string.isRequired
};

export default Timer;

// import React from "react";
// import PropTypes from "prop-types";

// const Timer = props => {
//   function handleSetTimer(e) {
//     const time = e.target.value;
//     props.setTimerLength(time);
//   }

//   return (
//     <div
//       className={`timer  ${
//         props.visibleTab == "timer" ? "--isActive" : "--isHidden"
//       }`}
//     >
//       <label>
//         Time in Minutes <br />
//         <input
//           type="number"
//           value={props.timerLength}
//           onChange={handleSetTimer}
//         />
//       </label>
//     </div>
//   );
// };

// Timer.propTypes = {
//   timerLength: PropTypes.number.isRequired,
//   setTimerLength: PropTypes.func.isRequired,
//   visibleTab: PropTypes.string.isRequired
// };

// export default Timer;
