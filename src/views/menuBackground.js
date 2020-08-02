import { randomArrayItem, randomBoundedFloat } from '../utils/random';
import { easeOutQuad, fullSineEase, easeInExpo } from '../utils/easing';

const MAX_AGE = 4000;

class Particle {
  constructor(el, height, width) {
    this.t = 0;
    this.element = el;
    this.height = el.height;
    this.width = el.width;
    this.minX = (el.width / 2);
    this.minY = (el.height / 2);
    this.maxX = randomBoundedFloat(width - 40, width) - (el.width / 2);
    this.maxY = randomBoundedFloat(height - 60, height) - (el.height / 2);
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.scale = 0.3;
    this.minScale = 0.3;
    this.maxScale = randomBoundedFloat(0.8, 1);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  update(dt) {
    this.t += dt;
    this.x = easeOutQuad(this.t, this.minX, this.maxX, MAX_AGE);
    this.y = this.maxY - easeInExpo(this.t, this.minY, this.maxY, MAX_AGE);
    this.scale = fullSineEase(this.t, this.minScale, this.maxScale, MAX_AGE);
    this.r -= (Math.PI / 40) % (Math.PI * 2); // 40 frames per full rotation
  }

  draw(ctx) {
    ctx.setTransform(
      this.scale, 0, 0, // horiz scale, vert skew, horz, skew
      this.scale, this.x, this.y, // vert scale, horiz translation, vert translation
    );
    ctx.rotate(this.r);

    ctx.drawImage(this.element, -this.width / 2, -this.height / 2);
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
    // remove old particles
    if (particles.length) {
      let i = 0;
      while (particles[i++].t >= MAX_AGE) {}
      particles.splice(0, i - 1); // cull excessive elements
    }


    // Calc Delta Time for Update Function
    const curDate = Date.now();
    const dt = curDate - prevDate;
    prevDate = curDate;
    // Clear Canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
    const newParicle = new Particle(newSrc, height, width);
    particles.push(newParicle);
  };

  setInterval(spawnAndCull, 350);
  requestAnimationFrame(animate);
};

export default initBackground;
