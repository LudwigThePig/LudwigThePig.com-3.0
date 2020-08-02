import { randomArrayItem } from '../utils/random';

class Particle {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.src = src;
    this.element.alt = 'particle';
    this.element.classList = 'menu-particle';
    this.pos = {
      x: 0,
      y: 0,
    };
    document.getElementById('menu-particles-ctr').appendChild(this.element);
  }

  update() {
    this.pos.x += 10;
    this.pos.y += 10;
    this.element.style.transform = `translate(${this.pos.x}, ${this.post.y});`;
  }
}

const initParticles = () => {
  const particles = [];

  const animate = () => {
    // update particles
    particles.forEach(p => p.update());

    requestAnimationFrame(animate);
  };

  const spawnAndCull = () => {
    const sources = ['/assets/cloud1.png', '/assets/cloud2.png'];
    const newSrc = randomArrayItem(sources);
    const newParicle = new Particle(newSrc);
    particles.unshift(newParicle);

    const culledParticles = particles.splice(15); // cull excessive elements
    culledParticles.forEach(({ element }) => element.remove());
  };

  setInterval(spawnAndCull, 300);
  requestAnimationFrame(animate);
};

export default initParticles;
