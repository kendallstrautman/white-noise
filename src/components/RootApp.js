import React from "react";
import NoiseMenu from "./NoiseMenu";
import Timer from "./Timer";
import Footer from "./Footer";

const RootApp = () => {
  return (
    <main className="main">
      <NoiseMenu />
      <Timer />
      <Footer />
    </main>
  );
};

export default RootApp;
