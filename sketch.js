let circles = [];
let colors = [];
let bgColor;

function setup() {
  createCanvas(500, 500);
  initializeCircles(); 
  changeColors(); 
}

function draw() {
  drawGradientBackground();

  // Draw circles and handle the repulsion effect when the mouse is near
  for (let circle of circles) {
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    if (d < circle.size / 2 + 20) {
      // Repel the circle when the mouse is near
      let angle = atan2(circle.y - mouseY, circle.x - mouseX);
      circle.x += cos(angle) * 5;
      circle.y += sin(angle) * 5;

      // Constrain the circle within the canvas boundaries
      circle.x = constrain(circle.x, circle.size / 2, width - circle.size / 2);
      circle.y = constrain(circle.y, circle.size / 2, height - circle.size / 2);
    }
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size);
  }
}
function mousePressed() {
  changeColors(); // Change color combinations on mouse click
}
// increased circles from 8 to 16
function initializeCircles() {
  for (let i = 0; i < 16; i++) { 
    circles.push({
      x: random(width),
      y: random(height),
      size: random(40, 80),
      color: color(255) 
    });
  }
}
// Change color combinations
function changeColors() {
  let colorSets = [
    [color(255, 182, 193), color(255, 105, 180), color(255, 20, 147)], // 粉色组
    [color(173, 216, 230), color(100, 149, 237), color(70, 130, 180)], // 蓝色组
    [color(255, 99, 71), color(220, 20, 60), color(178, 34, 34)], // 红色组
    [color(144, 238, 144), color(34, 139, 34), color(0, 100, 0)], // 绿色组
    [color(255, 255, 153), color(255, 223, 0), color(255, 165, 0)] // 黄色组
  ];
  colors = random(colorSets);
  
  for (let circle of circles) {
    circle.color = random(colors);
  }
 // Set the background color to the lightest color in the palette
  bgColor = colors[0];
}
// Draw gradient background
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 235), bgColor, inter); // 蓝色到当前背景颜色
    stroke(c);
    line(0, y, width, y);
  }
}