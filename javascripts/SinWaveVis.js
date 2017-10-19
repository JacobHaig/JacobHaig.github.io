var w = 800;
var w = 1600;
var numOfBars = 150;
var incr = 0;
var incrRate = 0.05;
var lineTrace = false;
var audio = new Audio('audio_file.mp3');

var bars = new Array(numOfBars);


function bar(x) {
  this.x = x;
  this.h = 0;
}

function setup() {
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);
  background(240, 240, 240);
  frameRate(15);

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
      line(i * (w / numOfBars) + (w / numOfBars) / 2, -bars[i].h + h, (i + 1) * (w / numOfBars) + (w / numOfBars) / 2, -bars[i + 1].h + h); // x1,y1,x2,y2
    }
  }

}

function draw() {
  background(240, 240, 240);

  incr += incrRate;
  for (var i = 0; i < numOfBars; i++) { // Sin wave generator that changes the heights of the bars
    bars[i].h = (h / 2) * sin(incr + (i * incrRate) +Math.random()/2) + (h / 2)
  }

  updateBars();

}