const background = () => {
  const canvas = document.getElementById('background');
  const ctx = canvas.getContext('2d');

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
  }

  function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  }

  class Shape {
    constructor(x, y, velX, velY) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
    }
  }

  class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);

      this.color = color;
      this.size = size;
      this.exists = true;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    update() {
      if (this.x + this.size >= width) {
        this.velX = -this.velX;
      }

      if (this.x - this.size <= 0) {
        this.velX = -this.velX;
      }

      if (this.y + this.size >= height) {
        this.velY = -this.velY;
      }

      if (this.y - this.size <= 0) {
        this.velY = -this.velY;
      }

      this.x += this.velX;
      this.y += this.velY;
    }
  }

  const balls = [];

  function loop() {
    while (balls.length < count) {
      const size = random(10, 20);
      const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
      );
      balls.push(ball);
    }
    while (balls.length > count) {
      balls.pop();
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
      if (ball.exists) {
        ball.draw();
        ball.update();
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
};
