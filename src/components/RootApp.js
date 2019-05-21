import React, { useState } from "react";
import Noise from "./Noise";
import TimerButton from "./TimerButton";
import AudioButton from "./AudioButton";

const RootApp = () => {
  const [noises] = useState({
    brown: new Audio(require("../assets/brown.mp3")),
    pink: new Audio(require("../assets/pink.mp3")),
    white: new Audio(require("../assets/white-noise.mp3")),
    blue: new Audio(require("../assets/blue.mp3")),
    violet: new Audio(require("../assets/purple.mp3")),
    grey: new Audio(require("../assets/gray.mp3"))
  });
  const [playing, setPlaying] = useState(true);
  const [colorPlaying, setColorPlaying] = useState(null);
  const toggleSound = e => {
    //get index & value of noise/color
    const i = Object.keys(noises).indexOf(e.target.classList[0]);
    const noisePlaying = Object.values(noises)[i];
    const color = Object.keys(noises)[i];
    setColorPlaying(color);
    //pause all other noises
    Object.values(noises).map(noise => {
      noise !== noisePlaying && noise.pause();
    });
    //if the color changed, play new color
    if (color !== colorPlaying) {
      noisePlaying.play();
      setPlaying(false);
    } else {
      //toggle play/pause
      if (playing) {
        setPlaying(false);
        noisePlaying.play();
      } else {
        setPlaying(true);
        noisePlaying.pause();
      }
    }
  };
  const createNoises = () => {
    return (
      <section className="noises">
        {Object.keys(noises).map(noise => {
          return (
            <div className={noise} key={noise} onClick={toggleSound}>
              <Noise color={noise} />
            </div>
          );
        })}
      </section>
    );
  };
  const toggleTimer = () => {
    console.log("timer");
  };
  const toggleAudio = () => {
    console.log("will handle audio setting here");
  };
  return (
    <main className="main">
      {createNoises()}
      <footer>
        <div className="icons">
          <div onClick={toggleTimer}>
            <TimerButton />
          </div>
          <div onClick={toggleAudio}>
            <AudioButton />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default RootApp;

// import React, { useState } from "react";
// import Noise from "./Noise";
// import Footer from "./Footer";

// const RootApp = () => {
//   const [noises] = useState({
//     brown: new Audio(require("../assets/brown.mp3")),
//     pink: new Audio(require("../assets/pink.mp3")),
//     white: new Audio(require("../assets/white-noise.mp3")),
//     blue: new Audio(require("../assets/blue.mp3")),
//     violet: new Audio(require("../assets/purple.mp3")),
//     grey: new Audio(require("../assets/gray.mp3"))
//   });
//   const [playing, setPlaying] = useState(true);
//   const [colorPlaying, setColorPlaying] = useState(null);
//   const toggleSound = e => {
//     //get index & value of noise/color
//     const i = Object.keys(noises).indexOf(e.target.classList[0]);
//     const noisePlaying = Object.values(noises)[i];
//     const color = Object.keys(noises)[i];
//     setColorPlaying(color);
//     //pause all other noises
//     Object.values(noises).map(noise => {
//       noise !== noisePlaying && noise.pause();
//     });
//     //if the color changed, play new color
//     if (color !== colorPlaying) {
//       noisePlaying.play();
//       setPlaying(false);
//     } else {
//       //toggle play/pause
//       if (playing) {
//         setPlaying(false);
//         noisePlaying.play();
//       } else {
//         setPlaying(true);
//         noisePlaying.pause();
//       }
//     }
//   };
//   const createNoises = () => {
//     return (
//       <section className="noises">
//         {Object.keys(noises).map(noise => {
//           return (
//             <div className={noise} key={noise} onClick={toggleSound}>
//               <Noise color={noise} />
//             </div>
//           );
//         })}
//       </section>
//     );
//   };
//   return (
//     <main className="main">
//       {createNoises()}
//       <Footer />
//     </main>
//   );
// };

// export default RootApp;
