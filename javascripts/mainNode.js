var w = 0;
var h = 0;
var amount = 40;
var nodes = [];
var framerate = 20;

function createObject(x, y, mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = windowWidth;
    h = windowHeight;
    strokeCap(SQUARE);
    for (var i = 0; i < amount; i++) startNode();
}

function startNode() {
    var Object = new createObject(random(0, w), random(0, h), random(1,10)); //var Object = new createObject(random(0, w), random(0, h));
    nodes.push(Object);
}

function newNode() {
    var Object = new createObject(random(0, w), h, random(2,10)); //var Object = new createObject(random(0, w), random(0, h));
    nodes.push(Object);
}

function windowResized() {
	w = windowWidth;
    h = windowHeight;
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();
    nodes.forEach(moveUp);
    nodes.forEach(drawNodes);
    nodes.forEach(checks);
    frameRate(framerate);
}

function drawNodes(item, index) {
    noStroke();
    fill(255 - item.mass * 10);
    ellipse(nodes[index].x, nodes[index].y, nodes[index].mass/2, nodes[index].mass/2);
}

function moveUp(item, index) {
	item.y -= item.mass/4;
}

function checks(item, index) {
    if ( item.y < 0) { //if node goes too far out of range reset node
        nodes.splice(index, 1);
        newNode();
    }
}