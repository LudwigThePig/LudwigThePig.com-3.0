import game from '../gameState';
import {
  forwardVelocity, maxRotationVelocity, reverseVelocity, rotationAcceleration,
} from '../utils/velocities';


export const inputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  jump: false,
  slide: false,
};


/**
 * @param { Three.Mesh } player
 * @param { object } keyboard Object where keys are keycodes and values are booleans.
 *  If true, the key is pressedbundleRenderer.renderToStream
 * @returns { void } function mutates the player param
 */
export const movePlayer = (player, inputs) => {
  player.rotation.z = 0;
  const pigPhy = game.physics[game.pig];
  const isMoving = (Math.abs(pigPhy.a.x) > 0.2 || Math.abs(pigPhy.a.z) > 0.2); // better than relying on inputs
  if ((isMoving) && game.isGrounded && game.pigParticles) game.pigParticles.play();
  // Forwards And Backwards
  if (inputs.down && game.isGrounded && !game.isSliding) {
    pigPhy.a.x += Math.sin(player.rotation.y) * reverseVelocity;
    pigPhy.a.z += Math.cos(player.rotation.y) * reverseVelocity;
  }
  if (inputs.up && game.isGrounded && !game.isSliding) {
    pigPhy.a.x -= Math.sin(player.rotation.y) * forwardVelocity;
    pigPhy.a.z -= Math.cos(player.rotation.y) * forwardVelocity;
  }

  // Y Rotation
  const rotationForce = rotationAcceleration * Math.abs((pigPhy.a.x + pigPhy.a.x) / 12);
  // 12 is a totally random number. This is hacky but it feels so goooood
  if (inputs.right) {
    pigPhy.rv = Math.max(-maxRotationVelocity, pigPhy.rv - rotationForce);
    player.rotation.z = 25;
  }
  if (inputs.left) {
    pigPhy.rv = Math.min(maxRotationVelocity, pigPhy.rv + rotationForce);
    player.rotation.z = -25;
  }

  // Jump Impulse Force
  if (game.isGrounded && inputs.jump) {
    game.isGrounded = false;
    pigPhy.v.y += (game.jumpForce / player.mass); // Jump force is really just velocity change
  }

  // Slide the Pig :)
  if (inputs.slide) {
    game.isSliding = true;
  } else if (game.isSliding) { // Avoid redundant reassignment
    game.isSliding = false;
  }
};
