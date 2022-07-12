let x = [];
let y = [];
let d = 0.00001;
let thickness = 0.6;
let r = 201,
  g = 91,
  b = 26;
let k = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0, 0, 0);
  noStroke();
  angleMode(DEGREES);
  initializeContour(width / 3);
}
function draw() {
  background(r, g, b, 5);
  translate(width / 2, height / 2);
  t = frameCount / 20;
  push();
  rotate(-t);
  scale(2, 2);
  noisyContour();
  pop();
  push();
  rotate(t);
  noisyContour();
  pop();
  push();
  scale(0.4, 0.4);
  rotate(-t);
  noisyContour();
  pop();
  push();
  rotate(t);
  scale(0.1, 0.1);
  noisyContour();
  pop();
}
function noisyContour() {
  for (let j = 0; j < 3; j++) {
    beginShape();
    for (let i = 0; i < 360; i++) {
      x[i] = x[i] - j * random(-d * sin(t), d * sin(t)) - 0.01 * cos(t * 20);
      y[i] = y[i] - j * random(-d * cos(t), d * cos(t));

      vertex(x[i], y[i]);
    }
    beginContour();
    for (let i = 360; i > 0; i--) {
      x[i] = x[i] - j * random(-0.1, 0.1);
      y[i] = y[i] - j * random(-0.1, 0.1);

      vertex(x[i] * thickness, y[i] * thickness);
    }
    endContour();
    endShape();
  }
}
function initializeContour(r) {
  for (let i = 0; i <= 360; i++) {
    x[i] = r * sin(i) + ((k * r) / 2) * cos(i / 2) * sin(i / 2);
    y[i] = r * cos(i);
  }
}
function mousePressed() {
  frameCount = 0;
  r = random(100, 255);
  g = random(100, 255);
  b = random(100, 255);
  k = random(-10, 5);
  fill(255 - r / 2, 255 - g / 2, 255 - b / 2);
  thickness = random(0.5, 0.99);
  d = random(0.000001, 0.0001);
  setup();
}
