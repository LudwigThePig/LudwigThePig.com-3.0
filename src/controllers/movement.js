import game from '../gameState';

const forwardVelocity = 0.2;
const rotationVelocity = 0.08;

const keys = {
  forward: 87, // W
  backwards: 83, // S
  left: 65, // A
  right: 68, // A
  spacebar: 32,
  shift: 16,
  c: 67,
};

export const keyboardInputs = {};

export const updatePosition = player => {
  // Forwards And Backwards
  if (keyboardInputs[keys.backwards]) {
    player.position.x += Math.sin(player.rotation.y) * forwardVelocity;
    player.position.z += Math.cos(player.rotation.y) * forwardVelocity;
  }
  if (keyboardInputs[keys.forward]) {
    player.position.x -= Math.sin(player.rotation.y) * forwardVelocity;
    player.position.z -= Math.cos(player.rotation.y) * forwardVelocity;
  }

  player.rotation.z = 0;
  // Y Rotation
  if (keyboardInputs[keys.right]) {
    player.rotation.y -= rotationVelocity;
    player.rotation.z = -25;
  }
  if (keyboardInputs[keys.left]) {
    player.rotation.y += rotationVelocity;
    player.rotation.z = 25;
  }

  // Slide the Pig :)
  if (keyboardInputs[keys.shift] || keyboardInputs[keys.c]) {
    game.isSliding = true;
  } else if (game.isSliding) { // Avoid redundant reassignment
    game.isSliding = false;
  }
};
