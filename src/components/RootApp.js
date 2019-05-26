import React, { useState, useEffect } from "react";
import NoiseMenu from "./NoiseMenu";
import Timer from "./Timer";
import Footer from "./Footer";

const RootApp = () => {
  const [timerLength, setTimerLength] = useState(0);
  useEffect(() => {
    console.log(timerLength);
  });
  return (
    <main className="main">
      <NoiseMenu timerLength={timerLength} />
      <Timer timerLength={timerLength} setTimerLength={setTimerLength} />
      <Footer />
    </main>
  );
};

export default RootApp;
