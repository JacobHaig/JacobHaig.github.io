var w = 0;
var h = 0;
var incr1 = 0;
var incr2 = 10;
var incr3 = 20;
var rgb1 = 0;
var rgb2 = 0;
var x = 0;
var y = 0;
var ran = 0;
var startAngle1 = 0;
var startAngle2 = 0;
var startAngle3 = 0;

function setup() {
    setInterval(function() {
        createCanvas(windowWidth, windowHeight);
        w = windowWidth;
        h = windowHeight;
        startAngle1 = (noise(incr1 + 1) * 10 - 5);
        startAngle2 = (noise(incr2 + 2) * 15 + 10);
        startAngle3 = -(noise(incr3 + 3) * 15 + 10);
        rgb = random(0, 255);
        background(30);
        translate(windowWidth / 2, windowHeight - 5)
        recur(9, 100, -90, 0, 0);
    }, 25);
}

function draw() {}

function recur(branch, length, angle, x, y) {
    incr1 += 0.000001;
    incr2 += 0.000002;
    incr3 += 0.000001;
    ran = random(1, 2);
    if (branch > 2) {
        rgb1 += 1 / 2;
        rgb2 += 1 / 2;
        stroke((255 / 2) * sin(rgb1) + (255 / 3), (85) * cos(rgb2) + (255 / 1.5), 0);
        strokeWeight(3);
        var xx = length * cos(angle * PI / 180) + x;
        var yy = length * sin(angle * PI / 180) + y;
        line(x, y, xx, yy);
        branch--;
        length /= 1.6;
        recur(branch, length * (1 + (noise(incr1) * 35 * 1 + 15) / 100 * 1.5) * 1.05, angle + startAngle1, xx, yy);
        recur(branch, length * (1 + (noise(incr2) * 35 * 1 + 15) / 100 * 1.5) * 1.00, angle + startAngle2, xx, yy);
        recur(branch, length * (1 + (noise(incr3) * 35 * 1 + 15) / 100 * 1.5) * 1.00, angle + startAngle3, xx, yy);
    }
}