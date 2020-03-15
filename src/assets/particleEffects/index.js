import * as THREE from 'three';


const defaultOptions = {
  maxParticles: 100,
  maxTime: 1000, // in MS
  particlesPerSecond: 50,
  particleVelocity: 1, // Meters per Second
  particleSize: 0.1,
  color: 0xFEDCBA,
};

class ParticleEffect {
  constructor(options = {}) {
    options = { ...defaultOptions, options };
    this.maxTime = options.maxTime;
    this.maxParticles = options.maxParticles;
    this.particlesPerSecond = options.particlesPerSecond;
    this.particleSize = options.particleSize;
    this.color = options.color;

    this.particles = [];

    this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    this.material = new THREE.Material(this.color);
  }

  createPaticle() {
    this.particles.push(new THREE.Mesh(this.geometry, this.material));
  }

  update(deltaTime = 0.02 /* 50fps */) {
    // create new particles


    const overThreshold = this.maxParticles - this.particles.length;
    if (overThreshold > 0) {
      // cull old particles
    }
  }
}


export default ParticleEffect;
