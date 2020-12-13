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

  const displacementMultiplier = clamp(0, 1)(-mesh.position.y / depthBeforeSubmerged) * displacementAmount;
  const newForce = Math.abs(game.gravityForce * displacementMultiplier);
  phy.f.y += newForce;


  if (Math.random() > 0.95) console.log(
    `displacementMultiplier: ${displacementMultiplier},
newForce: ${newForce} 
curForce: ${phy.f.y}`,
  );
};
