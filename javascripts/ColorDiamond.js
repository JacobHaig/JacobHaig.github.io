var w = 800;
var h = 1600;
var incr = 0;
var speed = .75; // <<---You can change this 

function setup() {
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);
  background(0, 0, 0);
}

function draw() {
  incr += 0.01;

  noStroke();
  fill(255 / 2 * sin(incr * 2) + 255 / 2, 255 / 2 * cos(incr * 3) + 255 / 2, 255 / 2 * sin(incr * 3) + 255 / 2);
  ellipse(w/2, h/2, w * sin(speed * incr), h * cos(speed * incr));

}