var _whiteNoise = function () {
  var bufferSize = 2 * p5sound.audiocontext.sampleRate;
  var whiteBuffer = p5sound.audiocontext.createBuffer(1, bufferSize, p5sound.audiocontext.sampleRate);
  var noiseData = whiteBuffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  whiteBuffer.type = 'white';
  return whiteBuffer;
}();


//blue noise is the inverse of pink
var _pinkNoise = function () {
  var bufferSize = 2 * p5sound.audiocontext.sampleRate;
  var pinkBuffer = p5sound.audiocontext.createBuffer(1, bufferSize, p5sound.audiocontext.sampleRate);
  var noiseData = pinkBuffer.getChannelData(0);
  var b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
  for (var i = 0; i < bufferSize; i++) {
    var white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    noiseData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    noiseData[i] *= 0.11;
    // (roughly) compensate for gain
    b6 = white * 0.115926;
  }
  pinkBuffer.type = 'pink';
  return pinkBuffer;
}();


//violet noise is roughly the inverse of brown
var _brownNoise = function () {
  var bufferSize = 2 * p5sound.audiocontext.sampleRate;
  var brownBuffer = p5sound.audiocontext.createBuffer(1, bufferSize, p5sound.audiocontext.sampleRate);
  var noiseData = brownBuffer.getChannelData(0);
  var lastOut = 0;
  for (var i = 0; i < bufferSize; i++) {
    var white = Math.random() * 2 - 1;
    noiseData[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = noiseData[i];
    noiseData[i] *= 3.5;
  }
  brownBuffer.type = 'brown';
  return brownBuffer;
}();
