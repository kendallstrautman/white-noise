import React, { useEffect, useState } from "react";

const Timer = () => {
  const [isDragging, setIsDragging] = useState(false);
  function floatToHour(num) {
    var sign = num >= 0 ? 1 : -1;
    var min = 1 / 60;
    // Get positive value of num
    num = num * sign;
    // Separate the int from the decimal part
    var intpart = Math.floor(num);
    var decpart = num - intpart;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);
    var minutes = Math.floor(decpart * 60);
    // Sign result
    sign = sign == 1 ? "" : "-";
    return sign + intpart + ":" + minutes;
  }
  function handleDrag() {
    console.log("draggin");
    setIsDragging(true);
  }
  function handleTimer(e) {
    console.log(e);
    const timerRange = document.querySelector(".timer__range");
    const slider = document.querySelector(".timer__slider");
    const info = document.querySelector(".countdown");
    const box = timerRange.getBoundingClientRect();
    const { atan2, PI, round } = Math;
    let angle;
    let centerX;
    let centerY;
    let deltaX;
    let deltaY;
    let posX;
    let posY;
    let time;
    console.log(isDragging);
    if (isDragging) {
      centerX = timerRange.offsetWidth / 2 + box.left;
      centerY = timerRange.offsetHeight / 2 + box.top;
      posX = e.pageX;
      posY = e.pageY;
      deltaY = centerY - posY;
      deltaX = centerX - posX;
      angle = atan2(deltaY, deltaX) * (180 / PI);
      angle -= 90;
      if (angle < 0) angle += 360;
      angle = round(angle);
      slider.style.transform = `rotate(${angle}deg)`;
      time = floatToHour(angle * 0.03333);
      info.textContent = time;
    }
  }

  useEffect(() => {
    window.addEventListener("drag", handleTimer);
  }, []);
  useEffect(() => {
    console.log(isDragging);
  });
  return (
    <div className="timer --isHidden">
      <div className="timer__range">
        <div className="countdown">0</div>
        <div
          draggable
          className="timer__slider"
          onDragStart={handleDrag}
          onDragEnd={handleDrag}
          onDrop={handleDrag}
        />
      </div>
    </div>
  );
};

export default Timer;
