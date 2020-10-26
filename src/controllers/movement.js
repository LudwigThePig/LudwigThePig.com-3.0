import { Vec3 } from 'cannon-es';
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
  const isMoving = (Math.abs(pigPhy.velocity.x) > 0.2 || Math.abs(pigPhy.velocity.z) > 0.2); // better than relying on inputs
  if (isMoving && game.isGrounded && game.pigParticles) game.pigParticles.play();
  // Forwards And Backwards
  if (inputs.down && game.isGrounded && !game.isSliding) {
    pigPhy.velocity.x += Math.sin(player.rotation.y) * reverseVelocity;
    pigPhy.velocity.z += Math.cos(player.rotation.y) * reverseVelocity;
  }
  if (inputs.up && game.isGrounded && !game.isSliding) {
    pigPhy.velocity.x -= Math.sin(player.rotation.y) * forwardVelocity;
    pigPhy.velocity.z -= Math.cos(player.rotation.y) * forwardVelocity;
  }

  // Y Rotation
  if (inputs.right) {
    pigPhy.angularVelocity.set(0, -1, 0);
    player.rotation.z = 25;
  }
  if (inputs.left) {
    pigPhy.angularVelocity.set(0, 1, 0);
    player.rotation.z = -25;
  }

  // Jump Impulse Force
  if (game.isGrounded && inputs.jump) {
    game.isGrounded = false;
    pigPhy.applyLocalImpulse(new Vec3(0, game.jumpForce / player.mass, 0), new Vec3(0, -1, 0)); // Jump force is really just velocity change
  }

  // Slide the Pig :)
  if (inputs.slide) {
    game.isSliding = true;
  } else if (game.isSliding) { // Avoid redundant reassignment
    game.isSliding = false;
  }
};
