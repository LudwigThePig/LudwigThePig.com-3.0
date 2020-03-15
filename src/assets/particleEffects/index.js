import * as THREE from 'three';
import { randomBoundedInt } from '../../utils/random';


const defaultOptions = {
  maxParticles: 100,
  maxTime: 1000, // in MS
  particlesPerSecond: 50,
  particleVelocity: 1, // Meters per Second
  particleSize: 0.1,
  color: 0xED6767,
};

class ParticleEffect {
  constructor(options = {}, scene) {
    options = { ...defaultOptions, options };
    this.maxTime = options.maxTime;
    this.maxParticles = options.maxParticles;
    this.particlesPerSecond = options.particlesPerSecond;
    this.particleVelocity = options.particleVelocity;
    this.particleSize = options.particleSize;
    this.color = options.color;

    this.scene = scene;

    this.particleQueue = [];

    this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: this.color });
  }

  createPaticle() {
    const geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: this.color });

    const newParticle = new THREE.Mesh(geometry, material);
    newParticle.position.z = randomBoundedInt(-1, 1);
    newParticle.position.y = 1;

    newParticle.position.x = randomBoundedInt(-1, 1);

    this.scene.add(newParticle);
    this.particleQueue.push(newParticle);
  }

  update(deltaTime = 0.02 /* 50fps */) {
    // create new particles
    for (let i = 0; i < this.particlesPerSecond * deltaTime; i++) {
      this.createPaticle();
    }

    // cull excess particles
    const overThreshold = this.particleQueue.length - this.maxParticles;
    if (overThreshold > 0) {
      const removed = this.particleQueue.splice(0, overThreshold);
      this.scene.remove(...removed);
    }

    // update current particles
    this.particleQueue.forEach(particle => {
      particle.position.y += this.particleVelocity * deltaTime;
    });
  }
}


export default ParticleEffect;
