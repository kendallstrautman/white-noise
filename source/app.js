let noiseType
const noise = new p5.Noise()
      brownTag = document.querySelector('brown')
      pinkTag = document.querySelector('pink')
      whiteTag = document.querySelector('white')
      balls = document.querySelectorAll('div.ball')
      ballArray = [].slice.call(balls)
      stopTag = document.querySelector('h2')

    //function to check for noise type and start noise
const makeNoise = (type) => {
  noise.setType(type)
  noise.amp(0.1)
  noise.start()
}
    //function to stop noise
const stopNoise = () => {
  noise.stop()
}

    //loop through each ball, wait for click, update the color, play noise
ballArray.forEach( ball => {
  ball.addEventListener("click", function(event){
    noiseType = event.toElement.innerHTML
    makeNoise(noiseType)
  })
})

    //wait for a click, stop noise
stopTag.addEventListener("click", () => {
  stopNoise()
})
