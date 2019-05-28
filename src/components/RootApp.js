import React, { useState } from "react";
import NoiseMenu from "./NoiseMenu/NoiseMenu";
import Timer from "./Timer/Timer";
import Info from "./Info/Info";
import Footer from "./Footer/Footer";

const RootApp = () => {
  const [timerLength, setTimerLength] = useState(0);
  const [tabIsVisible, setTabIsVisible] = useState("menu");
  return (
    <main className="main">
      <NoiseMenu timerLength={timerLength} />
      <Timer timerLength={timerLength} setTimerLength={setTimerLength} />
      <Info />
      <Footer tabIsVisible={tabIsVisible} setTabIsVisible={setTabIsVisible} />
    </main>
  );
};

export default RootApp;
