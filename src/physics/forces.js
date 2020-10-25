import game from '../gameState';
import {
  vecAdd, vecDivide, vecDivideScalar, vecMultiply, vecMultiplyScalar,
} from '../utils/math';


export default class Force {
  /**
   * A straightforward way to calculate the new pos
   * of an object, given a force
   */
  static leapFrogPos(force, mass, curVelocity, timeStep, curPos) {
    const acceleration = force / mass;
    const velocity = curVelocity + (acceleration * timeStep);
    const position = curPos + (velocity * timeStep);
    return { velocity, position };
  }

  /**
   * A more refined approach than the leapfrog approach
   * https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet
   */
  static verletPos(
    acceleration,
    curVelocity,
    force,
    mass,
    timeStep,
    curPos,
  ) {
    const lastAcceleration = acceleration;
    const position = (curPos + curVelocity * timeStep) + (0.5 * lastAcceleration * timeStep ** 2);
    const newAcceleration = force / mass;
    const avgAcceleration = (lastAcceleration + newAcceleration) / 2;
    const velocity = curVelocity + (avgAcceleration * timeStep);
    return { velocity, position };
  }
}

const calcAirResistance = v => -0.5 * game.rho * game.coefficientAir * game.meshes[game.pig].area * (v ** 2);
const calcRotationResistance = v => v - (game.coefficientRotation * v);

const calcNewVelocity = (a, v, terminalV) => {
  const newVelocity = v + (a * game.dt);
  const sign = newVelocity < 0 ? -1 : 1;
  return sign * Math.min(terminalV, Math.abs(newVelocity));
};

const calcGroundFriction = force => {
  if (!game.isGrounded) return force;

  const friction = game.isSliding
    ? game.coefficientGround / 7
    : game.coefficientGround;

  return force - (force * friction);
};


/**
 *
 * @param {number} entityPtr The pointer of an entity
 */
export const applyForcesv1 = entityPtr => {
  // * _______X and Z Forces_______ *
  // Physics Component
  const phy = game.physics[entityPtr];
  const mesh = game.collidables[entityPtr];

  if (!phy || !mesh) return;

  // F = M * A
  phy.f.x = phy.mass * phy.a.x;
  phy.f.z = phy.mass * phy.a.z;

  // Frictions
  phy.f.x += calcAirResistance(phy.v.x);
  phy.f.y += calcAirResistance(phy.v.y);
  phy.f.z += calcAirResistance(phy.v.z);
  phy.f.x = calcGroundFriction(phy.f.x);
  phy.f.y = calcGroundFriction(phy.f.y);
  phy.f.z = calcGroundFriction(phy.f.z);

  // Calculate Displacement (Verlet Integration)
  phy.d.x = (phy.v.x * game.dt) + (0.5 * phy.a.x * (game.dt ** 2));
  phy.d.z = (phy.v.z * game.dt) + (0.5 * phy.a.z * (game.dt ** 2));

  // Update Position with Displacement
  mesh.position.x += phy.d.x;
  mesh.position.z += phy.d.z;

  // Calculate New Acceleration
  phy.a.x = phy.f.x / phy.mass;
  phy.a.z = phy.f.z / phy.mass;

  // Calculate New Velocity
  phy.v.x = calcNewVelocity(phy.v.x, phy.a.x, game.terminalVelocity.xz);
  phy.v.z = calcNewVelocity(phy.v.z, phy.a.z, game.terminalVelocity.xz);


  // * _______Y Force_______ *
  // The position of the entity when on the ground
  // In the future this will be a helper function that
  // gets the height of the terrain's height at the entity's
  // x and z position. The terrain height will likely be
  // kept in a matrix

  phy.f.y = 0;

  // apply gravity force
  phy.f.y += (phy.mass * game.gravityForce);
  // apply force of air resistance
  phy.f.y += calcAirResistance(phy.v.y);
  // Displacement of the pig
  phy.d.y = (phy.v.y * game.dt) + (0.5 * phy.a.y * (game.dt ** 2));
  mesh.position.y += phy.d.y;
  // calculate current acceleration so we can derive velocity
  const newAY = phy.f.y / -game.gravityForce;
  const avgAY = (newAY + phy.a.y) / 2;
  phy.v.y += avgAY * game.dt;

  phy.a.y = phy.f.y / phy.mass;

  // Simulate colliding with the ground
  if (mesh.position.y - game.groundPos <= 0) {
    // phy.v.y *= game.e;
    // if (phy.v.y > -0.5 && phy.v.y < 0.5) {
    //   phy.a.y = 0;
    //   phy.f.y = 0;
    //   phy.d.y = 0;
    // game.isGrounded = true;
    // }
    // mesh.position.y = game.groundPos;
  }


  // * _______Rotational Force_______ *
  // Only handling y rotation at the moment and doing this very crudely, just to give it some
  // weightiness to it.
  phy.rv = calcRotationResistance(phy.rv);
  mesh.rotation.y += phy.rv;
};


/**
 *
 * @param {number} entityPtr The pointer of an entity
 */
export const applyForcesv3 = entityPtr => {
  // * _______X and Z Forces_______ *
  // Physics Component
  const phy = game.physics[entityPtr];
  const mesh = game.collidables[entityPtr];

  if (!phy || !mesh) return;

  phy.f.y += game.gravityForce * phy.mass; // Jump force is really just velocity change

  // F = M * A
  phy.f = vecMultiplyScalar(phy.a, phy.mass);

  // Frictions
  phy.f.x += calcAirResistance(phy.v.x);
  phy.f.z += calcAirResistance(phy.v.z);
  phy.f.x = calcGroundFriction(phy.f.x);
  phy.f.z = calcGroundFriction(phy.f.z);

  // Calculate Displacement (Verlet Integration)
  phy.d = vecAdd(vecMultiplyScalar(phy.v, game.dt), vecMultiplyScalar(phy.a, (0.5 * game.dt * 2)));

  // Update Position with Displacement
  mesh.position.add(phy.d);

  // Calculate New Acceleration
  phy.a = vecDivideScalar(phy.f, phy.mass);

  // Calculate New Velocity
  phy.v.x = calcNewVelocity(phy.v.x, phy.a.x, game.terminalVelocity.xz);
  phy.v.y = calcNewVelocity(phy.v.y, phy.a.y, game.terminalVelocity.xz);
  phy.v.z = calcNewVelocity(phy.v.z, phy.a.z, game.terminalVelocity.xz);

  if (mesh.position.y - game.groundPos <= 0) {
    game.isGrounded = true;
  } else {
    game.isGrounded = false;
  }

  // * _______Rotational Force_______ *
  // Only handling y rotation at the moment and doing this very crudely, just to give it some
  // weightiness to it.
  phy.rv = calcRotationResistance(phy.rv);
  mesh.rotation.y += phy.rv;
};

/**
 *
 * @param {number} entityPtr The pointer of an entity
 */
export const applyForces = entityPtr => {
  // * _______X and Z Forces_______ *
  // Physics Component
  const phy = game.physics[entityPtr];
  const mesh = game.collidables[entityPtr];

  if (!phy || !mesh) return;

  phy.f.y += game.gravityForce * phy.mass;

  // last_acceleration = acceleration
  const lastAcceleration = phy.a.clone();
  // position += velocity * time_step + ( 0.5 * last_acceleration * time_step^2 )
  const displacement = vecAdd(vecMultiplyScalar(phy.v, game.dt), vecMultiplyScalar(lastAcceleration, 0.5 * (game.dt ** 2)));
  mesh.position.add(displacement);
  // new_acceleration = force / mass
  const newAcceleration = vecDivideScalar(phy.f, phy.mass);
  // avg_acceleration = ( last_acceleration + new_acceleration ) / 2
  const avgAcceleration = vecDivideScalar(vecAdd(lastAcceleration, newAcceleration), 2);
  // velocity += avg_acceleration * time_step
  phy.v.add(vecMultiplyScalar(avgAcceleration, game.dt));

  if (mesh.position.y - game.groundPos <= 0) {
    game.isGrounded = true;
  } else {
    game.isGrounded = true;
  }

  // * _______Rotational Force_______ *
  // Only handling y rotation at the moment and doing this very crudely, just to give it some
  // weightiness to it.
  phy.rv = calcRotationResistance(phy.rv);
  mesh.rotation.y += phy.rv;
};


// https://github.com/pmndrs/cannon-es/blob/master/src/objects/Body.ts#L614

const integrate = entityPtr => {
// Save previous position
  this.previousPosition.copy(this.position);
  this.previousQuaternion.copy(this.quaternion);

  if (!(this.type === Body.DYNAMIC || this.type === Body.KINEMATIC) || this.sleepState === Body.SLEEPING) {
  // Only for dynamic
    return;
  }
  const { dt } = game;
  const phy = game.phy[entityPtr];
  const mesh = game.meshes[entityPtr];
  const velo = this.velocity;
  const angularVelo = this.angularVelocity;
  const pos = this.position;
  const { torque } = this;
  const invInertia = this.invInertiaWorld;
  const { linearFactor } = this;

  const iMdt = phy.mass * dt;
  phy.v.x += phy.f.x * iMdt * phy.linFac.x;
  phy.v.y += phy.f.y * iMdt * phy.linFac.y;
  phy.v.z += phy.f.z * iMdt * phy.linFac.z;

  const e = phy.inertia;
  const tx = phy.trq.x * phy.angFac.x;
  const ty = phy.trq.y * phy.angFac.y;
  const tz = phy.trq.z * phy.angFac.z;
  phy.av.x += dt * (e[0] * tx + e[1] * ty + e[2] * tz);
  phy.av.y += dt * (e[3] * tx + e[4] * ty + e[5] * tz);
  phy.av.z += dt * (e[6] * tx + e[7] * ty + e[8] * tz);

  // Use new velocity  - leap frog
  mesh.position.x += phy.v.x * dt;
  mesh.position.y += phy.v.y * dt;
  mesh.position.z += phy.v.z * dt;

  // TODO:
  // quat.integrate(this.angularVelocity, dt, this.angularFactor, quat);

  // if (quatNormalize) {
  //   if (quatNormalizeFast) {
  //     quat.normalizeFast();
  //   } else {
  //     quat.normalize();
  //   }
  // }

  this.aabbNeedsUpdate = true;

  // Update world inertia
  // TODO:
  // this.updateInertiaWorld();
};
