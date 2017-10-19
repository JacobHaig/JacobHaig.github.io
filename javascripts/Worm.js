var width;

var height;

var incr;

var arrx = [0, 0, 0, 0, 0];

var arry = [0, 0, 0, 0, 0];



function setup() {

	width = windowWidth, height = windowHeight;

	incr = 0;

	createCanvas(windowWidth, windowHeight);

}



function draw() {

	background(201);

	fill(51);

	arrx.push((noise(incr) * width));

	arry.push((noise(incr - 1) * height));

	for (var x = arrx.length - 7; x < arrx.length; x++) {

		line(arrx[x], arry[x], arrx[x + 1], arry[x + 1]);

		stroke(incr * 4 % 255, incr * 2 % 255, incr * 1.5 % 255);

		strokeWeight(min(sqrt(x), 10))

	}

	frameRate(10);

	incr += 0.02;

}