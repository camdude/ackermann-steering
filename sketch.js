let playerCar;

function setup() {
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);
  background(200);

  playerCar = new Car(width / 2, height / 2, 50, "red");
}

function draw() {
  if (keyIsDown(87) || keyIsDown(38)) {
    playerCar.accelerate();
  }
  if (keyIsDown(83) || keyIsDown(40)) {
    playerCar.reverse();
  }
  if (keyIsDown(32)) {
    playerCar.park();
  }
  if (keyIsDown(65) || keyIsDown(37)) {
    playerCar.turnLeft(3);
  }
  if (keyIsDown(68) || keyIsDown(39)) {
    playerCar.turnRight(1);
  }

  background(200);
  playerCar.show();
}
