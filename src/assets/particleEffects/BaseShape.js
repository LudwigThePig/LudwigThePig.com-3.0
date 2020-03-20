import * as THREE from 'three';

export default class BaseShape {
  constructor(mesh, ΘX, ΘY, ΘZ, fast) {
    this.mesh = mesh;
    this.fast = fast;
    this.randomPoints = [];
    if (this.fast) this.bakeRandomValues();
  }

  getVertex() {
    if (this.fast) {
      return this.randomPoints[Math.random() * (this.randomPoints.length - 1)];
    }
    return this;
  }

  generateRandomPoint() {
    const vertex = this.getVertex();
    return [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
  }

  bakeRandomValues() {
    for (let i = 0; i < 100; i++) {
      this.randomPoints.push(this.generateRandomPoint());
    }
  }
}
