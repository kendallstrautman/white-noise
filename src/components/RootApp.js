import React, { useState } from "react";
import NoiseMenu from "./NoiseMenu";
import Timer from "./Timer";
import Info from "./Info";
import Footer from "./Footer";

const RootApp = () => {
  const [timerLength, setTimerLength] = useState(0);
  const [isVisible, setIsVisible] = useState("menu");
  return (
    <main className="main">
      <NoiseMenu timerLength={timerLength} />
      <Timer timerLength={timerLength} setTimerLength={setTimerLength} />
      <Info />
      <Footer isVisible={isVisible} setIsVisible={setIsVisible} />
    </main>
  );
};

export default RootApp;
