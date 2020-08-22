/* eslint-disable max-classes-per-file */
import { randomArrayItem, randomBoundedFloat } from '../utils/random';
import { easeInOutQuad, fullSineEase, easeInExpo } from '../utils/easing';

const MAX_AGE = 4000;

class Particle {
  constructor(el, cHeight, cWidth) {
    this.t = 0;
    this.element = el;
    this.height = el.height;
    this.width = el.width;
    this.minX = (el.width / 2);
    this.minY = 0;// (el.height / 2);
    this.maxX = randomBoundedFloat(cWidth - 40, cWidth) - (el.width / 2);
    this.maxY = randomBoundedFloat(cHeight - 60, cHeight) - (el.height / 4);
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
    this.x = easeInOutQuad(this.t, this.minX, this.maxX, MAX_AGE);
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

class PigBoat {
  constructor(el, cHeight, cWidth) {
    this.element = el;
    this.height = el.height;
    this.width = el.width;
    this.cHeight = cHeight;
    this.cWidth = cWidth;
    this.x = 0;
    this.y = 0;
    this.scale = 0.9;
    this.vertSkew = 0;
    this.horizSkew = 0;
    this.t = 0;
  }

  update(dt) {
    const hDuration = 2000;
    const vDuration = 4500;
    this.t += dt % 18000; // 18000 is LCD of hD and vD
    this.horizSkew = fullSineEase(this.t, this.horizSkew, 0.03, hDuration);
    this.vertSkew = fullSineEase(this.t, this.vertSkew, 0.03, vDuration);
  }

  draw(ctx) {
    ctx.setTransform(
      this.scale, this.horizSkew, this.vertSkew, // horiz scale, vert skew, horz, skew
      this.scale, this.x, this.y, // vert scale, horiz translation, vert translation
    );
    ctx.drawImage(this.element, this.x, this.y);
  }
}

const initBackground = () => {
  const canvas = document.getElementById('menu-background-canvas');
  const { height, width } = canvas;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const pigBoatEl = document.getElementById('img-pigboat');
  const pigBoat = new PigBoat(pigBoatEl, height, width);
  const particles = [];
  let prevDate = Date.now();
  const animate = () => {
    // remove old particles
    if (particles.length) {
      let i = 0;
      while (i < particles.length && particles[i].t >= MAX_AGE) { i++; }
      particles.splice(0, i - 1); // cull excessive elements
    }


    // Calc Delta Time for Update Function
    const curDate = Date.now();
    const dt = curDate - prevDate;
    prevDate = curDate;
    // Clear Canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    // Update and draw dynamic items
    pigBoat.update(dt);
    pigBoat.draw(ctx);
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
