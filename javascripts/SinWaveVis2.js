var h = 800;
var w = 1600;
var numOfBars = 255;
var incr = 0;
var incrRate = 0.05;
var lineTrace = true;
var song, analyzer, fft;
var bars = new Array(numOfBars);
var History = [0];


function preload() {
  song = loadSound('assets/Seven nations army.mp3');
}


function bar(x) {
  this.x = x;
  this.h = 0;
}

function setup() {
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);
  background(240, 240, 240);
  //frameRate(25);

  analyzer = new p5.Amplitude();
  fft = new p5.FFT();


  analyzer.setInput(song);
  song.play()

  for (var i = 0; i < numOfBars; i++) {
    var b = new bar(i * (w / numOfBars));
    b.h = (i + 1) * (h / numOfBars);
    bars[i] = b;
  }
}

function updateBars() {
  for (var j = 0; j < numOfBars; j++) { //Draw the Boxes

    noStroke();
    var r = 255 * (1 - (1 / 2 * cos(255 * (bars[j].h / h) * (Math.PI / 255) + 0) + (1 / 2)));
    var g = 255 * (0 + (1 / 2 * cos(255 * (bars[j].h / h) * (Math.PI / 255) - Math.PI / 2) + 1 / 2) - .50) * 2;
    var b = 255 * (0 + (1 / 2 * cos(255 * (bars[j].h / h) * (Math.PI / 255) + 0) + (1 / 2)));
    fill(r, g, b);

    rect(j * (w / numOfBars), h, w / numOfBars + 1, -bars[j].h); // x,y,w,h
  }

  for (var i = 0; i < numOfBars - 1; i++) { // Draw the Lines connecting the boxes if lineTrace is true
    if (lineTrace) {
      stroke(0);
      strokeWeight(1.5);
      line(i * (w / numOfBars) + (w / numOfBars) / 2, -bars[i].h + h, (i + 1) * (w / numOfBars) + (w / numOfBars) / 2, -bars[i + 1].h + h); // x1,y1,x2,y2
    }
  }

}

function draw() {
  background(240, 240, 240);
  //noise()
  incr += incrRate;

  //History.push(h * analyzer.getLevel());
  var spectrum = fft.analyze();
  for (var i = 1; i < numOfBars; i++) { // Sin wave generator that changes the heights of the bars

    var energy = h * fft.getEnergy(i * numOfBars / 4, (i + 1) * numOfBars / 4) / 255;

    bars[i].h = energy; // 2*History[History.length -i]; //255* i/numOfBars,255*(i+1)/numOfBars
    //bars[i].h = (h / 2) * sin(incr + (i * incrRate) +Math.random()/4) + (h / 2)
  }

  updateBars();

}