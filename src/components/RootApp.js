import React, { useState, useEffect } from "react";
import NoiseMenu from "./NoiseMenu/NoiseMenu";
import Timer from "./Timer/Timer";
import Info from "./Info/Info";
import Footer from "./Footer/Footer";

const RootApp = () => {
  const [timerLength, setTimerLength] = useState(0);
  const [visibleTab, setVisibleTab] = useState("menu");
  const [deviceHeight, setDeviceHeight] = useState(null);
  useEffect(function calcDeviceHeight() {
    setDeviceHeight(window.innerHeight);
  });
  return (
    <main className="main" style={{ height: deviceHeight && deviceHeight }}>
      <NoiseMenu
        timerLength={timerLength}
        setTimerLength={setTimerLength}
        visibleTab={visibleTab}
      />
      <Timer
        timerLength={timerLength}
        setTimerLength={setTimerLength}
        visibleTab={visibleTab}
      />
      <Info visibleTab={visibleTab} />
      <Footer visibleTab={visibleTab} setVisibleTab={setVisibleTab} />
    </main>
  );
};

export default RootApp;
