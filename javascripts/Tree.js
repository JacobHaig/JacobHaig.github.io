var w = 0;

var h = 0;

var rgb = 0;

var x = 0;

var y = 0;





function setup() {

    createCanvas(windowWidth, windowHeight);

    w = windowWidth;

    h = windowHeight;

    background(30);

    translate(windowWidth / 2, windowHeight - 5);
	
    recur(10, 135, -90, 0, 0);



}



function draw() {



}



function recur(branch, length, angle, x, y) {

    if (branch > 1) {

        rgb += .1;

        stroke((rgb / 2 + 255 / 4) % 255, (rgb * 5 + 255 / 2) % 255, 0);

        strokeWeight(3);

        var xx = length * cos(angle * PI / 180) + x;

        var yy = length * sin(angle * PI / 180) + y;



        line(x, y, xx, yy);

        branch--;

        length /= 1.5;



        recur(branch, length * 1.5, angle - 2, xx, yy);

        recur(branch, length, angle + 20, xx, yy);

        recur(branch, length, angle - 35, xx, yy);

    }

}