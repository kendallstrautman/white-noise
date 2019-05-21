import React, { useState, useEffect } from "react";
import Noise from "./Noise";
import TimerButton from "./TimerButton";
import AudioButton from "./AudioButton";

const RootApp = () => {
  const [audioContext] = useState(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const getAudioFile = async (audioContext, filepath) => {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };
  const setupAudio = async filepath => {
    const sample = await getAudioFile(audioContext, filepath);
    return sample;
  };
  const createSample = audioBuffer => {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.loop = true;
    return function toggleSample(isPlay) {
      isPlay ? sampleSource.start() : sampleSource.stop();
    };
    // return sampleSource;
  };
  const [noises, setNoises] = useState({
    brown: setupAudio("../assets/brown.wav").then(sample =>
      createSample(sample)
    ),
    pink: setupAudio("../assets/pink.mp3"),
    white: setupAudio("../assets/white-noise.mp3"),
    blue: setupAudio("../assets/blue.mp3"),
    violet: setupAudio("../assets/purple.mp3"),
    grey: setupAudio("../assets/gray.mp3")
  });
  const [playing, setPlaying] = useState(true);
  const [colorPlaying, setColorPlaying] = useState(null);
  const [noisePlaying, setNoisePlaying] = useState(null);
  const toggleSound = e => {
    //get index & value of noise/color
    const i = Object.keys(noises).indexOf(e.target.classList[0]);
    const noise = Object.values(noises)[i];
    const color = Object.keys(noises)[i];
    setColorPlaying(color);
    setNoisePlaying(noise);
    setNoises({ ...noises });

    //pause all other noises
    // Object.values(noises).map(noise => {
    //   noise !== noisePlaying && noise.pause();
    // });
    //if the color changed, play new color
    if (playing) {
      setPlaying(false);
      // audioContext.resume();
      console.log(noises);
      noise.then(toggleSample => toggleSample(true));
    } else {
      setPlaying(true);
      // audioContext.suspend();
      noise.then(toggleSample => toggleSample(false));
      setNoises({
        ...noises,
        [color]: setupAudio("../assets/" + color + ".wav").then(sample =>
          createSample(sample)
        )
      });
    }
    // if (color !== colorPlaying) {
    //   noisePlaying.then(sample => playSample(sample));
    //   setPlaying(false);
    // } else {
    //   //toggle play/pause
    //   if (playing) {
    //     setPlaying(false);
    //     noisePlaying.then(sample => playSample(sample));
    //   } else {
    //     setPlaying(true);
    //     // noisePlaying.then(sample => playSample(false, sample));
    //   }
    // }
  };
  useEffect(() => {
    // console.log(noises);
    // noises.pink.then(sample => playSample(sample));
  });
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
// import TimerButton from "./TimerButton";
// import AudioButton from "./AudioButton";

// const RootApp = () => {
//   const [noises] = useState({
//     brown: new Audio(require("../assets/brown.wav")),
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
//       noisePlaying.loop = true;
//       noisePlaying.play();
//       setPlaying(false);
//     } else {
//       //toggle play/pause
//       if (playing) {
//         setPlaying(false);
//         noisePlaying.loop = true;
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
//   const toggleTimer = () => {
//     console.log("timer");
//   };
//   const toggleAudio = () => {
//     console.log("will handle audio setting here");
//   };
//   return (
//     <main className="main">
//       {createNoises()}
//       <footer>
//         <div className="icons">
//           <div onClick={toggleTimer}>
//             <TimerButton />
//           </div>
//           <div onClick={toggleAudio}>
//             <AudioButton />
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// };

// export default RootApp;
