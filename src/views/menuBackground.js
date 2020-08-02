import { randomArrayItem } from '../utils/random';
import { easeInOutSine, fullSineEase, easeInExpo } from '../utils/easing';

const MAX_AGE = 2000;

class Particle {
  constructor(el, height = 0, width = 0) {
    this.t = 0;
    this.element = el;
    this.height = el.height;
    this.width = el.width;
    this.maxY = 0;
    this.maxX = width;
    this.x = 0; // current x, also lower bound
    this.y = height; // current y, also lower bound
    this.r = 0;
    this.scale = 0.1;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  update(dt) {
    this.t += dt;
    this.x = easeInOutSine(this.t, 0, this.maxX, MAX_AGE);
    this.y = this.height - easeInExpo(this.t, 0, this.height, MAX_AGE);
    this.scale = fullSineEase(this.t, 0, 1, MAX_AGE);
    this.r -= (Math.PI / 20) % (Math.PI * 2); // 40 frames per rotation
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

  setInterval(spawnAndCull, 300);
  requestAnimationFrame(animate);
};

export default initBackground;
