import React, { useState } from "react";
import Noise from "./Noise";

const NoiseMenu = () => {
  //audio context setup-------------------------------------------------------------
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
    //persistant sample ref stored in the closure for toggling
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination);
    sampleSource.loop = true;
    return function toggleSample(isPlay) {
      isPlay ? sampleSource.start() : sampleSource.stop();
    };
  };
  //stateful noise data & instantiation----------------------------------------------
  const [noises, setNoises] = useState({
    brown: setupAudio("../assets/brown.wav").then(sample =>
      createSample(sample)
    ),
    pink: setupAudio("../assets/pink.wav").then(sample => createSample(sample)),
    white: setupAudio("../assets/white.wav").then(sample =>
      createSample(sample)
    ),
    blue: setupAudio("../assets/blue.wav").then(sample => createSample(sample)),
    violet: setupAudio("../assets/violet.wav").then(sample =>
      createSample(sample)
    )
  });
  const [colorPlaying, setColorPlaying] = useState(null);
  const updateColorPlaying = e => {
    const i = Object.keys(noises).indexOf(e.target.classList[0]);
    if (colorPlaying == null) {
      setColorPlaying(Object.keys(noises)[i]);
    } else if (colorPlaying == Object.keys(noises)[i]) {
      setColorPlaying(null);
    } else {
      setColorPlaying(Object.keys(noises)[i]);
    }
  };
  //rendering-------------------------------------------------------------------
  const renderNoises = () => {
    return (
      <div className="noises">
        {Object.keys(noises).map(noise => {
          return (
            <div className={noise} key={noise} onClick={updateColorPlaying}>
              <Noise
                color={noise}
                colorPlaying={colorPlaying}
                setupAudio={setupAudio}
                createSample={createSample}
              />
            </div>
          );
        })}
      </div>
    );
  };
  return <section className="noise-menu">{renderNoises()}</section>;
};

export default NoiseMenu;

// import React, { useState } from "react";
// import Noise from "./Noise";

// const NoiseMenu = () => {
//   //audio context setup-------------------------------------------------------------
//   const [audioContext] = useState(
//     new (window.AudioContext || window.webkitAudioContext)()
//   );
//   const getAudioFile = async (audioContext, filepath) => {
//     const response = await fetch(filepath);
//     const arrayBuffer = await response.arrayBuffer();
//     const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
//     return audioBuffer;
//   };
//   const setupAudio = async filepath => {
//     const sample = await getAudioFile(audioContext, filepath);
//     return sample;
//   };
//   const createSample = audioBuffer => {
//     //persistant sample ref stored in the closure for toggling
//     const sampleSource = audioContext.createBufferSource();
//     sampleSource.buffer = audioBuffer;
//     sampleSource.connect(audioContext.destination);
//     sampleSource.loop = true;
//     return function toggleSample(isPlay) {
//       isPlay ? sampleSource.start() : sampleSource.stop();
//     };
//   };
//   //stateful noise data & instantiation----------------------------------------------
//   const [noises, setNoises] = useState({
//     brown: setupAudio("../assets/brown.wav").then(sample =>
//       createSample(sample)
//     ),
//     pink: setupAudio("../assets/pink.wav").then(sample => createSample(sample)),
//     white: setupAudio("../assets/white.wav").then(sample =>
//       createSample(sample)
//     ),
//     blue: setupAudio("../assets/blue.wav").then(sample => createSample(sample)),
//     violet: setupAudio("../assets/violet.wav").then(sample =>
//       createSample(sample)
//     ),
//     grey: setupAudio("../assets/grey.mp3").then(sample => createSample(sample))
//   });
//   const [playing, setPlaying] = useState(true);
//   const [prevColor, setPrevColor] = useState(null);
//   const [prevNoise, setPrevNoise] = useState(null);
//   //handle all pause/play of noises------------------------------------------------
//   const toggleSound = e => {
//     //get index & value of noise/color
//     const i = Object.keys(noises).indexOf(e.target.classList[0]);
//     const noise = Object.values(noises)[i];
//     const color = Object.keys(noises)[i];
//     //update state
//     setPrevColor(color);
//     setPrevNoise(noise);
//     //if the color changed, play new color & pause prev
//     if (color !== prevColor) {
//       setPlaying(false);
//       if (prevNoise) {
//         prevNoise.then(toggleSample => toggleSample(false));
//         setNoises({
//           ...noises,
//           [prevColor]: setupAudio(`../assets/${prevColor}.wav`).then(sample =>
//             createSample(sample)
//           )
//         });
//       }
//       noise.then(toggleSample => toggleSample(true));
//     } else {
//       //regular play/pause toggle
//       if (playing) {
//         setPlaying(false);
//         noise.then(toggleSample => toggleSample(true));
//       } else {
//         setPlaying(true);
//         noise.then(toggleSample => toggleSample(false));
//         //reset the noise instance after stopping
//         setNoises({
//           ...noises,
//           [color]: setupAudio(`../assets/${color}.wav`).then(sample =>
//             createSample(sample)
//           )
//         });
//       }
//     }
//   };
//   //rendering-------------------------------------------------------------------
//   const renderNoises = () => {
//     return (
//       <div className="noises">
//         {Object.keys(noises).map(noise => {
//           return (
//             <div className={noise} key={noise} onClick={toggleSound}>
//               <Noise
//                 color={noise}
//                 colorPlaying={prevColor}
//                 setUpAudio={setUpAudio}
//                 createSample={createSample}
//               />
//             </div>
//           );
//         })}
//       </div>
//     );
//   };
//   return <section className="noise-menu">{renderNoises()}</section>;
// };

// export default NoiseMenu;
