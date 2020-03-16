import * as THREE from 'three';
import { randomBoundedInt, randomBoundedFloat } from '../../utils/random';


const defaultOptions = {
  maxParticles: 100,
  maxTime: 1000, // in MS
  particlesPerSecond: 50,
  particleVelocity: 1, // Meters per Second
  rotationRate: 0,
  radius: new THREE.Vector3(1, 1, 1),
  minParticleSize: 0.1,
  maxParticleSize: 0.1,
  color: 0xedaa67,
  playOnLoad: true,
};

class ParticleEffect {
  constructor(target, options = {}) {
    options = { ...defaultOptions, options };
    this.color = options.color;
    this.minParticleSize = options.minParticleSize || options.maxParticleSize || 0.1;
    this.maxParticles = options.maxParticles;
    this.maxParticleSize = options.maxParticleSize || options.minParticleSize || 0.1;
    this.maxTime = options.maxTime;
    this.particlesPerSecond = options.particlesPerSecond;
    this.particleVelocity = options.particleVelocity;
    this.particleQueue = [];
    this.play = options.playOnLoad;
    this.radius = options.radius;
    this.rotationRate = options.rotationRate;
    this.target = target;
  }

  createPaticle() {
    const size = randomBoundedInt(this.minParticleSize, this.maxParticleSize);
    const geometry = new THREE.BoxBufferGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: this.color });

    const newParticle = new THREE.Mesh(geometry, material);
    newParticle.position.x = randomBoundedFloat(-this.radius.x, this.radius.x);
    newParticle.position.y = randomBoundedFloat(-this.radius.y, this.radius.y);
    newParticle.position.z = randomBoundedFloat(-this.radius.z, this.radius.z);
    newParticle.rotation.x = randomBoundedFloat(0, Math.PI * 2);
    newParticle.rotation.y = randomBoundedFloat(0, Math.PI * 2);
    newParticle.rotation.z = randomBoundedFloat(0, Math.PI * 2);

    this.target.add(newParticle);
    this.particleQueue.push(newParticle);
  }

  update(deltaTime = 0.02 /* 50fps */) {
    if (!this.play) return;

    // create new particles
    for (let i = 0; i < this.particlesPerSecond * deltaTime; i++) {
      this.createPaticle();
    }

    // cull excess particles
    const overThreshold = this.particleQueue.length - this.maxParticles;
    if (overThreshold > 0) {
      const removed = this.particleQueue.splice(0, overThreshold);
      this.target.remove(...removed);
    }

    // update current particles
    this.particleQueue.forEach(particle => {
      particle.position.y += this.particleVelocity * deltaTime;
    });
  }

  play() {
    this.play = true;
  }

  pause() {
    this.play = false;
  }

  clear() {
    this.target.remove(...this.particleQueue);
    this.particleQueue = [];
  }

  stop() {
    this.pause();
    this.clear();
  }
}


export default ParticleEffect;
