import { Vector3, Quaternion } from 'three';

export class Physics {
  constructor(mass) {
    /** Displacement (maybe deprecated?) */
    this.d = new Vector3();

    /** Force */
    this.f = new Vector3();

    /** Velocity */
    this.v = new Vector3();

    /** Angular Velocity */
    this.av = new Vector3();

    /** Acceleration */
    this.a = new Vector3();

    /** Rotational Velocity (deprecated) */
    this.rv = 0;

    /** Quaterion */
    this.quat = new Quaternion();

    /** Mass, in kg */
    this.mass = mass;

    /**
     * Angular Factor:
     * Limit the rotational motion along any world axis. (1,1,1) will allow rotation along all axes
     * while (0,0,0) allows none.
     */
    this.angFac = new Vector3(1, 1, 1);

    /**
     * Linear Factor:
     * Limit the motion along any world axis. (1,1,1) will allow motion along all axes while (0,0,0)
     * allows none.
     */
    this.linFac = new Vector3(1, 1, 1);


    /** Torque:
     * Rotational force on the body around center of mass
     */
    this.trq = new Vector3();


    /** Inertia */
    this.inertia = new Vector3();
  }
}
