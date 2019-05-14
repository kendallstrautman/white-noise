import React from "react";
import Noise from "./Noise";
import Footer from "./Footer";

const RootApp = () => {
  return (
    <main className="main">
      <section className="noises">
        <Noise color="brown" src="../assets/brown.mp3" />
        <Noise color="pink" src="../assets/pink.mp3" />
        <Noise color="white" src="../assets/white.mp3" />
        <Noise color="blue" src="../assets/blue.mp3" />
        <Noise color="violet" src="../assets/purple.mp3" />
        <Noise color="grey" src="../assets/gray.mp3" />
      </section>
      <Footer />
    </main>
  );
};

export default RootApp;
