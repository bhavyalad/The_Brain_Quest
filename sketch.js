// Bubble Game with Timer, Score, and Completion Message
let bubbles = [];
let bubbleCount;
let startTime;
let gameOver = false;
let finalTime = 0;
let completionMessage = "Well done! You popped all the bubbles!";

function setup() {
  createCanvas(600, 400);
  bubbleCount = int(random(10, 26)); // Random count from 10 to 25

  for (let i = 0; i < bubbleCount; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    bubbles.push(new Bubble(x, y, r));
  }
  noCursor();
  startTime = millis();
}

function draw() {
  background(30);

  if (!gameOver) {
    // Draw custom cursor
    fill(255, 100, 100);
    noStroke();
    ellipse(mouseX, mouseY, 20);

    for (let i = bubbles.length - 1; i >= 0; i--) {
      let b = bubbles[i];
      b.show();
      b.move();

      if (b.rollover(mouseX, mouseY)) {
        bubbles.splice(i, 1);
      }
    }

    // Check if all bubbles are popped
    if (bubbles.length === 0) {
      finalTime = (millis() - startTime) / 1000;
      gameOver = true;
    }

    // Show current time
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Time: " + ((millis() - startTime) / 1000).toFixed(2) + "s", 10, 10);
  } else {
    // Game over screen with message
    background(20);
    fill(0, 255, 100);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("All bubbles popped!", width / 2, height / 2 - 40);
    textSize(24);
    text("Final Time: " + finalTime.toFixed(2) + " seconds", width / 2, height / 2);
    textSize(20);
    fill(255);
    text(completionMessage, width / 2, height / 2 + 40);
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.r + 10;
  }

  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(100, 150, 255, 150);
    ellipse(this.x, this.y, this.r * 2);
  }
}
  
