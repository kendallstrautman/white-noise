import React from "react";

const Noise = props => {
  return (
    <div className="noise">
      <h1 id={props.color} className={props.color}>
        {props.color}
      </h1>
    </div>
  );
};

export default Noise;
