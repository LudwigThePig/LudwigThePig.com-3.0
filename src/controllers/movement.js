import game from '../gameState';
import { forwardVelocity, rotationVelocity } from '../utils/velocities';

const keys = {
  forward: 87, // W
  backwards: 83, // S
  left: 65, // A
  right: 68, // A
  spacebar: 32,
  shift: 16,
  c: 67,
};

export const inputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  jump: false,
  slide: false,
};


export const updatePosition = (player, particles) => {
  // Forwards And Backwards
  if (inputState.down) {
    particles.play();
    player.position.x += Math.sin(player.rotation.y) * forwardVelocity;
    player.position.z += Math.cos(player.rotation.y) * forwardVelocity;
  }
  if (inputState.up) {
    particles.play();
    player.position.x -= Math.sin(player.rotation.y) * forwardVelocity;
    player.position.z -= Math.cos(player.rotation.y) * forwardVelocity;
  }

  player.rotation.z = 0;
  // Y Rotation
  if (inputState.right) {
    player.rotation.y -= rotationVelocity;
    player.rotation.z = -25;
  }
  if (inputState.left) {
    player.rotation.y += rotationVelocity;
    player.rotation.z = 25;
  }

  // Slide the Pig :)
  if (inputState.slide) {
    game.isSliding = true;
  } else if (game.isSliding) { // Avoid redundant reassignment
    game.isSliding = false;
  }
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

  // Forwards And Backwards
  if (inputs.up && game.isGrounded && !game.isSliding) {
    pigPhy.a.x += Math.sin(player.rotation.y) * forwardVelocity;
    pigPhy.a.z += Math.cos(player.rotation.y) * forwardVelocity;
  }
  if (inputs.down && game.isGrounded && !game.isSliding) {
    pigPhy.a.x -= Math.sin(player.rotation.y) * forwardVelocity;
    pigPhy.a.z -= Math.cos(player.rotation.y) * forwardVelocity;
  }

  // Y Rotation
  if (inputs.right) {
    player.rotation.y -= rotationVelocity;
    player.rotation.z = -25;
  }
  if (inputs.left) {
    player.rotation.y += rotationVelocity;
    player.rotation.z = 25;
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
