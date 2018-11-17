/*jshint esversion: 6 */

const noise = new p5.Noise();
let noiseType;
const brownTag = document.querySelector('brown');
const pinkTag = document.querySelector('pink');
const whiteTag = document.querySelector('white');
const balls = document.querySelectorAll('div.ball');
const ballArray = [].slice.call(balls);
const stopTag = document.querySelector('h2');

    //function to check for noise type and start noise
const makeNoise = function(type) {
  noise.setType(type);
  noise.amp(0.1);
  noise.start();
};
    //function to stop noise
const stopNoise = function() {
  noise.stop();
};

    //loop through each ball, wait for click, update the color, play noise
ballArray.forEach( function(ball) {
  ball.addEventListener("click", function(event){
    noiseType = event.toElement.innerHTML;
    makeNoise(noiseType);
  });
});

    //wait for a click, stop noise
stopTag.addEventListener("click", function(){
  stopNoise();
});
