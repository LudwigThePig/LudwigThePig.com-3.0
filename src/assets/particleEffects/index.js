const defaultOptions = {
  maxParticles: 100,
  maxTime: 1000, // in MS
  particlesPerSecond: 50,
  particleVelocity: 1, // Meters per Second
};

class ParticleEffect {
  constructor(options = {}) {
    options = { ...defaultOptions, options };
    this.maxTime = options.maxTime;
    this.maxParticles = options.maxParticles;
    this.particlesPerSecond = options.particlesPerSecond;

    this.particles = [];
  }

  update(deltaTime) {
    // create new particles


    const overThreshold = this.maxParticles - this.particles.length;
    if (overThreshold > 0) {
      // cull old particles
    }
  }
}


export default ParticleEffect;
