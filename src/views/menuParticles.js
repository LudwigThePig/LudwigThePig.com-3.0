import { randomArrayItem } from '../utils/random';

class Particle {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.src = src;
    this.element.alt = 'particle';
    this.element.classList = 'menu-particles-ctr';
    document.getElementById('menu-particles-ctr').appendChild(this.element);
  }

  update() {
    this.element.style.left += 10;
  }
}

const initParticles = () => {
  const particles = [];

  const animate = () => {
    const sources = ['/assets/cloud1.png', '/assets/cloud2.png'];
    const newSrc = randomArrayItem(sources);
    const newParicle = new Particle(newSrc);
    particles.unshift(newParicle);

    const culledParticles = particles.splice(15); // cull excessive elements
    culledParticles.forEach(({ element }) => element.remove());

    // update particles
    particles.forEach(p => p.update());

    requestAnimationFrame(animate);
  };


  requestAnimationFrame(animate);
};

export default initParticles;
