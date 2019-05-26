import React from "react";

const TimerContext = React.createContext({
  time: "0"
});

export const Provider = TimerContext.Provider;
export const Consumer = TimerContext.Consumer;
