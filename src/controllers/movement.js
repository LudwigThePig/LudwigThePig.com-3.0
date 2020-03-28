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
