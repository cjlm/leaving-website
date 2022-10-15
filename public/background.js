const backgroundAnimation = () => {
  const canvas = document.getElementById('background');
  const ctx = canvas.getContext('2d');

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  ctx.clearRect(0, 0, width, height);

  function mulberry32(a) {
    return function () {
      var t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  let a = 0;
  function random(min, max) {
    const num = Math.floor(mulberry32(a++)() * (max - min)) + min;
    return num;
  }

  function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  }

  function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  };

  Ball.prototype.update = function () {
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
  };

  const balls = [];

  function loop() {
    while (balls.length < count) {
      const size = random(5, 20);
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

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
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
