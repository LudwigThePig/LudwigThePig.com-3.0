import { randomArrayItem } from '../utils/random';

class Particle {
  constructor(src) {
    this.element = document.createElement('img');
    this.element.src = src;
    this.element.alt = 'particle'`<img src="${src}" alt="particle">`;
  }

  update() {
    this.element;
  }
}

const initParticles = () => {
  const particles = [];
  createNewParticle();

  const animate = () => {
    const sources = ['/assets/cloud1', '/assets/cloud2'];
    const newParicle = new Particle(randomArrayItem(sources));


    const culledParticles = particles.splice(15); // cull excessive elements
    culledParticles.forEach(({ element }) => element.remove());

    // update particles
    particles.forEach(p => p.update());

    requestAnimationFrame(animate);
  };


  requestAnimationFrame(animate);
};

export default initParticles;
