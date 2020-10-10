import { Vector3 } from 'three';
import { Physics } from '../physics/physics';

export default class RigidBody {
  /**
   * @param {number} mass mass of rigid body in kg
   */
  constructor(mesh, mass = 10) {
    this.physics = new Physics(mass);
  }
}
