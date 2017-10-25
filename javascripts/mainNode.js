var w = 0;
var h = 0;
var number = 1;
var maxNumber = 25;
var amount = 20;
var nodes = [];
var incr = 3.14 / 2 * 3;
var newX = 0;
var newY = 0;
var framerate = 30;

function createObject(x, y, mass) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1) / (mass * 2);
    this.vy = random(-1, 1) / (mass * 2);
    this.mass = mass;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = windowWidth;
    h = windowHeight;
    strokeCap(SQUARE);
    //var Object = new createObject(w / 2, h / 2, 15); //var Object = new createObject(random(0, w), random(0, h));
    //nodes.push(Object);
    for (var i = 0; i < amount; i++) newNode();
}

function newNode() {
    var Object = new createObject(random(0, w - 400) + 200, random(0, h - 400) + 200, 5); //var Object = new createObject(random(0, w), random(0, h));
    nodes.push(Object);
}

function draw() {
    clear();
    nodes.forEach(gravity);
    nodes.forEach(drawLines);
    nodes.forEach(drawNodes);
    nodes.forEach(checks);
    frameRate(framerate);
}

function drawNodes(item, index) {
    noStroke();
    fill((nodes[index].mass) / 2 + 255 / 2, (nodes[index].mass) / 2 + 255 / 2, 0);
    ellipse(nodes[index].x, nodes[index].y, nodes[index].mass, nodes[index].mass);
}

function gravity(item, index) {
    for (var i = 0; i < nodes.length; i++) {
        if (index != i) {
            var distance = dist(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y); // getting the distance between two points
            var angle = Math.atan2(nodes[i].x - nodes[index].x, nodes[i].y - nodes[index].y) * 180 / PI; //getting angle in deg
            angle += 90;
            if (angle < 0) //fixing the angle
                angle += 360;
            angle = angle / 180 * PI; // turn back in to rad
			
			var const1 = 1;
			var constgrav = .1; 
            var force = (constgrav * (nodes[i].mass * nodes[index].mass) / Math.pow(distance/const1,2) ); // Get the force from the (c*(m1*m2)/r)/mass instead of (G(m1*m2)/r^2)/mass
            nodes[index].vx += force * Math.cos(angle); //Get velocity from angle of the force
            nodes[index].vy -= force * Math.sin(angle);
            
            nodes[index].x -= nodes[index].vx; //Change velocity in to Pos
            nodes[index].y -= nodes[index].vy;
        }
    }
    item.vx -= item.vx / 4000; //Drag in X
    item.vy -= item.vy / 4000; //Drag in Y
}

function checks(item, index) {

    if (item.x > w + 200 || item.x < -200 || item.y > h + 200 || item.y < -200) { //if node goes too far out of range reset node
        nodes.splice(index, 1);
        var Object = new createObject(random(0, w - 400) + 200, random(0, h - 400) + 200, item.mass); //var Object = new createObject(random(0, w), random(0, h));
        nodes.push(Object);
    }
    for (i = 0; i < nodes.length; i++)
        if (index != i) {
            var distance = dist(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y);
            if (distance < (nodes[index].mass + 4)) {
                nodes[index].mass = min(nodes[index].mass + nodes[i].mass, 15);
                nodes[index].vx = (nodes[index].vx * nodes[index].mass + nodes[i].vx * nodes[i].mass) / nodes[index].mass;
                nodes[index].vy = (nodes[index].vy * nodes[index].mass + nodes[i].vy * nodes[i].mass) / nodes[index].mass;
                nodes.splice(i, 1);
                newNode();
            }
        }

    if (nodes.length > maxNumber)
        nodes.splice(nodes.length - 1, 1);
}

function drawLines(item, index) {
    for (i = 0; i < nodes.length; i++) {
        var distance = dist(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y);
        if (distance < 1000) {
            fill(200);
            stroke(200);
            strokeWeight(min(300 / distance, 3) - 2);
            fill(200);
            //line(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y);
        }
    }
}

function mouseReleased() {
    var Object2 = new createObject(newX, newY, 1);
    Object2.vx = (newX - mouseX) / 40;
    Object2.vy = (newY - mouseY) / 40;
    nodes.push(Object2);
}

function mousePressed() {
    newX = mouseX;
    newY = mouseY;
}