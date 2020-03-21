import * as THREE from 'three';
import { randomArrayItem, randomBoundedFloat } from '../../utils/random';

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

    // Get two random verticies and draw a line between them and pick a spot on that line
    const a = randomArrayItem(this.mesh.geometry.verticies);
    const b = randomArrayItem(this.mesh.geometry.verticies);

    const d = Math.random();

    // (x1, y1, z1) + d * ((x2, y2, z2) - (x1, y1, z1))
    return a.add(b.add(a.negate()).multiply(new THREE.Vector3(d, d, d)));
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
