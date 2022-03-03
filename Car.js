class Car {
  constructor(x, y, size, colour) {
    this.pos = createVector(x, y);
    this.x = x;
    this.y = y;
    this.size = size;
    this.w = (size / 3) * 2;
    this.l = size;
    this.colour = colour;
    this.debug = true;
    this.heading = 0;
    this.speed = 0;
    this.maxSpeed = 4;
    this.steeringAngle = 0;
    this.wheelBase = this.l / 2;

    // this.frontWheel = createVector(
    //   this.pos.x + this.wheelBase / 2,
    //   this.pos.y
    // ).mult(createVector(cos(this.heading), sin(this.heading)));
    // this.backWheel = createVector(
    //   this.pos.x - this.wheelBase / 2,
    //   this.pos.y - this.wheelBase / 2
    // ).mult(createVector(cos(this.heading), sin(this.heading)));

    this.frontWheel = createVector(this.pos.x + this.wheelBase / 2, this.pos.y);
    this.backWheel = createVector(this.pos.x - this.wheelBase / 2, this.pos.y);
    console.log("pos:", this.pos);
    console.log("frontWheel:", this.frontWheel);
    console.log("backWheel:", this.backWheel);
    console.log(createVector(cos(this.heading), sin(this.heading)));
  }

  show() {
    var dt = 1;
    this.backWheel.add(
      createVector(cos(this.heading), sin(this.heading))
        .mult(dt)
        .mult(this.speed)
    );
    console.log(this.backWheel.x, this.backWheel.y);
    this.frontWheel.add(
      createVector(
        cos(this.heading + this.steeringAngle),
        sin(this.heading + this.steeringAngle)
      )
        .mult(dt)
        .mult(this.speed)
    );

    this.pos = createVector(
      (this.frontWheel.x + this.backWheel.x) / 2,
      (this.frontWheel.y + this.backWheel.y) / 2
    );
    this.heading = atan2(
      this.frontWheel.y - this.backWheel.y,
      this.frontWheel.x - this.backWheel.x
    );

    // current wheels direction
    ellipseMode(CENTER);
    if (this.debug) {
      stroke("black");
      fill("green");
      ellipse(this.frontWheel.x, this.frontWheel.y, 3, 3); // current frontWheel
      line(
        this.frontWheel.x,
        this.frontWheel.y,
        this.frontWheel.x + this.l * cos(this.heading + this.steeringAngle),
        this.frontWheel.y + this.l * sin(this.heading + this.steeringAngle)
      );
      fill("lightGreen");
      ellipse(this.backWheel.x, this.backWheel.y, 3, 3); // current backWheel
      stroke("orange");
      line(
        this.backWheel.x,
        this.backWheel.y,
        this.backWheel.x + this.l * cos(this.heading),
        this.backWheel.y + this.l * sin(this.heading)
      );
      stroke("black");
      fill("red");

      ellipse(this.pos.x, this.pos.y, 5, 5);

      var a = this.frontWheel.x - this.backWheel.x;
      var b = this.frontWheel.y - this.backWheel.y;
      var c = sqrt(a * a + b * b);
      console.log("Axle Distance", c);
    }

    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);

    // car body
    fill(this.colour);
    if (this.debug) {
      noFill();

      // axles
      line(-this.wheelBase / 2, -this.w / 2, -this.wheelBase / 2, this.w / 2);
      line(this.wheelBase / 2, -this.w / 2, this.wheelBase / 2, this.w / 2);
    }

    rect(0, 0, this.l, this.w);
    var lightLength = this.size / 8;
    var lightWidth = this.size / 12;
    fill("orange");
    ellipse(this.l / 2, this.w / 3, lightWidth, lightLength);
    ellipse(this.l / 2, -this.w / 3, lightWidth, lightLength);

    // wheels
    var wheelThickness = this.size / 10;
    var wheelLength = this.size / 4;
    fill("black");
    rect(-this.wheelBase / 2, -this.w / 2, wheelLength, wheelThickness); // back left
    rect(-this.wheelBase / 2, this.w / 2, wheelLength, wheelThickness); // back right

    translate(this.wheelBase / 2, -this.w / 2);
    rotate(this.steeringAngle);
    rect(0, 0, wheelLength, wheelThickness); // front left
    rotate(-this.steeringAngle);
    translate(0, this.w);
    rotate(this.steeringAngle);
    rect(0, 0, wheelLength, wheelThickness); // front right
  }

  accelerate() {
    if (this.speed < this.maxSpeed) {
      this.speed += 0.1;
    }
  }

  reverse() {
    if (this.speed > -1) {
      this.speed -= 0.1;
    }
  }

  park() {
    this.speed = 0;
  }

  turnLeft() {
    if (this.steeringAngle > -30) {
      this.steeringAngle--;
    }
  }

  turnRight() {
    if (this.steeringAngle < 30) {
      this.steeringAngle++;
    }
  }
}
