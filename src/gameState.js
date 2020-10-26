import { Material, World } from 'cannon-es';
import { getCanvasDimensions } from './utils/dimensions';

class Game {
  constructor() {
    this.isSliding = false;
    const { height, width } = getCanvasDimensions();
    this.height = height;
    this.width = width;
    this.world = new World();
    this.world.gravity.set(0, -9.82, 0); // m/s²

    // * Entity Components
    this.meshes = [];
    this.collidables = [];
    this.physics = [];
    this.buoyant = [];
    this.inputs = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      slide: false,
    };

    // Player specific stuff
    this.pig = undefined; // pointer for the pig
    this.isGrounded = false;
    this.isSliding = false;

    // Entity Stuff
    this.pointer = -1;
    this.entities = [];
    this.groundPos = 1;


    //*  Misc Settings
    // Time
    this.d1 = new Date().valueOf(); // Current timestamp
    this.d2 = new Date().valueOf(); // Timestamp of last frame
    this.dt = 0.00; // delta time between frames

    // Forces
    this.jumpForce = 100;
    this.gravityForce = -9.81; // meters per second

    this.terminalVelocity = { xz: 30 };

    // Force Coefficients
    this.e = -0.2; // Coefficient of restitution ('bounciness' of the floor)
    this.rho = 1.2; // Density of air. Try 1000 for water.
    this.coefficientAir = 0.47; // Air Resistance
    this.coefficientGround = 0.07; // Ground Friction
    this.coefficientRotation = 0.05; // Rotation friction in water

    this.pigParticles = null;
  }

  createEntity() {
    this.pointer++;
    this.entities[this.pointer] = undefined;
    return this.pointer;
  }

  updateDeltaTime() {
    this.d2 = this.d1;
    this.d1 = new Date().valueOf();
    this.dt = (this.d1 - this.d2) / 1000;
  }
}

const game = new Game();
export default game;
