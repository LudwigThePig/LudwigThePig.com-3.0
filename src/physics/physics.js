import { Vector3 } from 'three';

export class Physics {
  constructor(mass) {
    this.d = new Vector3(); // Displacement
    this.f = new Vector3(); // Force
    this.v = new Vector3(); // Velocity
    this.a = new Vector3(); // Acceleration
    this.rv = 0; // rotation velocity
    this.mass = mass; // in kg
  }
}
