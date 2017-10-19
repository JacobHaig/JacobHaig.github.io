var t = 2;
var i = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background((sin(i) + 1) * 255 / 2);
	i += .01;
	frameRate(100);
	recur(t);
}

function recur(t) {
	if (t < 100 * (windowHeight / (windowHeight *.80))) {
		t++;
		fill(-(t * 255 / 100 * (windowHeight / (windowHeight *.80))) + 255*1.55);
		noStroke();
		ellipse(windowWidth / 2, (windowHeight - 85) - 5 * t, t * 2, t * 2);
		recur(t);
	}
}