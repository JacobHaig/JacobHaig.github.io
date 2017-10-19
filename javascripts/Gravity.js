var w = 0;
var h = 0;
var number = 0;
var amount = 7;
var nodes = [];
var incr = 3.14 / 2 * 3;

function createObject(x, y) {
	this.x = x;
	this.y = y;
	this.vx = random(-10, 10) / 10;
	this.vy = random(-10, 10) / 10;
	this.number = number++;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);
	w = windowWidth;
	h = windowHeight;
	strokeCap(SQUARE);
	for (var i = 0; i < amount; i++) {
		var Object = new createObject(random(0, w - 400) + 200, random(0, h - 400) + 200); //var Object = new createObject(random(0, w), random(0, h));
		nodes.push(Object);
	}
}

function draw() {
	background(130, 200, 255);
	nodes.forEach(gravity);
	nodes.forEach(drawLines);
	incr += .1;
	for (var i = 0; i < nodes.length; i++) {
		fill(incr * 20 % 255);
		ellipse(nodes[i].x, nodes[i].y, 10, 10);
	}
	nodes.forEach(checks);
	nodes.resize
	frameRate(100);
}

function gravity(item, index) {
	for (var i = 0; i < nodes.length; i++) {
		if (index != i) {
			var distance = dist(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y);
			//if (distance < 5)
			//delete nodes[index];
			var angle = Math.atan2(nodes[i].x - nodes[index].x, nodes[i].y - nodes[index].y) * 180 / PI; // in radians
			angle += 90;
			if (angle < 0) angle += 360;
			angle = angle / 180 * PI;
			if (distance < 600) {
				var force = min(2 / pow(distance, .95), 8);
				nodes[index].vx += force * Math.cos(angle);
				nodes[index].vy -= force * Math.sin(angle);
			}
			nodes[index].vx = min(10, nodes[index].vx);
			nodes[index].vy = min(10, nodes[index].vy);
			nodes[index].x -= nodes[index].vx;
			nodes[index].y -= nodes[index].vy;
		}
	}
	item.vx -= item.vx / 500;
	item.vy -= item.vy / 500;

}


function checks(item, index) {
	if (item.x > w + 100 || item.x < -100 || item.y > h + 100 || item.y < -100) {
		nodes.splice(index, 1);
		var Object = new createObject(random(0, w - 400) + 200, random(0, h - 400) + 200); //var Object = new createObject(random(0, w), random(0, h));
		nodes.push(Object);
	}
}

function drawLines(item, index) {
	for (i = 0; i < nodes.length; i++) {
		var distance = dist(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y);
		if (distance < 600) {
			fill(200);
			strokeWeight(min(300 / distance, 3));
			fill(200);
			line(nodes[index].x, nodes[index].y, nodes[i].x, nodes[i].y);
		}
	}
}