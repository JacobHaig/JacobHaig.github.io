var w = 0;
var h = 0;
var amount = 40;
var nodes = [];
var framerate = 25;

function createObject(x, y, mass) {
  this.x = x;
  this.y = y;
  this.mass = mass;
}

function setup() {
  w = windowWidth - 50;
  h = windowHeight - 50;
  createCanvas(w, h);

  noStroke();
  for (var i = 0; i < amount; i++)
  startNode();
}

function startNode() {
  var Object = new createObject(random(0, w), random(0, h), random(1,10));
  nodes.push(Object);
}

function windowResized() {
  w = windowWidth - 50;
  h = windowHeight - 50;
  resizeCanvas(w, h);
}

function draw() {
  clear();
  nodes.forEach(moveUp);
  nodes.forEach(drawNodes);
  frameRate(framerate);
}

function drawNodes(item, index) {
  fill(255 - item.mass * 10);
  ellipse(nodes[index].x, nodes[index].y, nodes[index].mass/2, nodes[index].mass/2);
}

function moveUp(item, index) {
  item.y -= item.mass/4;
  if ( item.y < 0)  //if node goes too far out of range reset node
  item.y += h;

}
