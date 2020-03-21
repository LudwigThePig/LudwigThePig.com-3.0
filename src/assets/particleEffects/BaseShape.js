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

    return this.generateRandomPoint();
  }


  /**
   * This method only works with enclosed shapes. So, if you provide a donut,
   * it will not have a whole... That is a problem that I would like to solve but
   * am not smaht enough for
   */
  generateRandomPoint() {
    // Get two random verticies to lerp a value between
    const a = randomBoundedFloat(this.mesh.geometry.verticies);
    const b = randomArrayItem(this.mesh.geometry.verticies);

    const d = Math.random(); // Where the value is in the lerp

    // (x1, y1, z1) + d * ((x2, y2, z2) - (x1, y1, z1))
    return a.add(b.add(a.negate()).multiply(new THREE.Vector3(d, d, d)));
  }

  bakeRandomValues() {
    for (let i = 0; i < 100; i++) {
      this.randomPoints.push(this.generateRandomPoint());
    }
  }
}
