import { randomArrayItem } from '../utils/random';

class Particle {
  constructor(el, left = 0, top = 0) {
    this.element = el;
    this.x = left;
    this.y = top;
    this.r = 0;
    this.t = 0;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  update(dt) {
    this.t += dt;
    this.x += 2;
    this.y -= 2;
    this.r -= (Math.PI / 20) % (Math.PI * 2); // 40 frames per rotation
  }

  draw(ctx) {
    ctx.setTransform(
      1, 0, 0, // horiz scale, vert skew, horz, skew
      1, this.x, this.y, // vert scale, horiz translation, vert translation
    );
    ctx.rotate(this.r);
    ctx.drawImage(this.element, 0, 0, 30, 30);
  }
}

const initBackground = () => {
  const canvas = document.getElementById('menu-background-canvas');
  const { height, width } = canvas;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const particles = [];
  let prevDate = Date.now();
  const animate = () => {
    // Calc Delta Time for Update Function
    const curDate = Date.now();
    const dt = curDate - prevDate;
    prevDate = curDate;
    // Clear Canvas
    ctx.clearRect(0, 0, width, height);
    // Draw Static Items
    // Update and draw dynamic items
    particles.forEach(p => {
      p.update(dt);
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  };

  const spawnAndCull = () => {
    const clouds = [document.getElementById('img-cloud1'), document.getElementById('img-cloud2')];
    const newSrc = randomArrayItem(clouds);
    const newParicle = new Particle(newSrc, 0, height);
    particles.unshift(newParicle);

    particles.splice(15); // cull excessive elements
  };

  setInterval(spawnAndCull, 1000);
  requestAnimationFrame(animate);
};

export default initBackground;
