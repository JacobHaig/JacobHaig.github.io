var arrX = [];
var arrY = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(20);
	strokeWeight(5);
}

function draw() {
	if (mouseIsPressed) {
		arrX.push(mouseX);
		arrY.push(mouseY);
		for (i = arrX.length - 4; i < arrX.length; i++) curve(arrX[i], arrY[i], arrX[i + 1], arrY[i + 1], arrX[i + 2], arrY[i + 2], arrX[i + 3], arrY[i + 3]);
	} else if (touchIsDown) {
		arrX.push(touchX);
		arrY.push(touchY);
		for (i = arrX.length - 4; i < arrX.length; i++) curve(arrX[i], arrY[i], arrX[i + 1], arrY[i + 1], arrX[i + 2], arrY[i + 2], arrX[i + 3], arrY[i + 3]);
	} else {
		arrX = [];
		arrY = [];
		stroke(random(0, 255), random(0, 255), random(0, 255));
	}
}