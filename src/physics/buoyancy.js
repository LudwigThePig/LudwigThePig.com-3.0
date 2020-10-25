import { Vec3 } from 'cannon-es';
import game from '../gameState';
import { clamp } from '../utils/math';

// https://www.youtube.com/watch?v=eL_zHQEju8s&ab_channel=TomWeiland

const depthBeforeSubmerged = 1;
const displacementAmount = 3;
/**
 *
 * @param {number} entityPtr pointer to
 */
export const applyBuoyancy = entityPtr => {
  // console.log(entityPtr);
  const phy = game.physics[entityPtr];
  const mesh = game.meshes[entityPtr];
  if (!phy) throw new Error('Must have physics to have buoyancy!');

  if (mesh.position.y <= game.groundPos) {
    phy.linearDamping = 0.8;
  } else {
    phy.linearDamping = 0.1;
  }
  const displacementMultiplier = clamp(0, 1)(-mesh.position.y / depthBeforeSubmerged) * displacementAmount;
  const newForce = Math.abs((game.gravityForce * 5 /** Mass */) * displacementMultiplier);

  const forceVec = new Vec3(0, newForce, 0);
  const relPoint = new Vec3(mesh.position.x, mesh.position.y - 1, mesh.position.z);
  phy.applyForce(forceVec, relPoint);
};
