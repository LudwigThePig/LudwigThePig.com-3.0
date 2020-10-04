import game from '../gameState';


// This is more of a giant function than a class, but this is easier to read
class MobileInputManager {
  constructor() {
    this.origin = null;

    const el = document.getElementById('touch-register-canvas');
    el.addEventListener('touchstart', this.handleStart, false);
    el.addEventListener('touchend', this.handleEnd, false);
    el.addEventListener('touchmove', this.handleMove, false);
  }

  static clearInput() {
    game.inputs.up = false;
    game.inputs.down = false;
    game.inputs.left = false;
    game.inputs.right = false;
  }

  static getTouchPos(e) {
    return {
      x: e.touches[0].screenX,
      y: e.touches[0].screenY,
    };
  }

  handleStart(e) {
    this.origin = MobileInputManager.getTouchPos(e);
  }


  handleMove(e) {
    const tolerance = 100;
    const { x, y } = MobileInputManager.getTouchPos(e);
    MobileInputManager.clearInput();

    if (this.origin.x < x - tolerance)
      game.inputs.right = true;
    else if (this.origin.x > x + tolerance)
      game.inputs.left = true;

    if (this.origin.y < y - tolerance)
      game.inputs.down = true;
    else if (this.origin.y > y + tolerance)
      game.inputs.up = true;
  }


  handleEnd() {
    MobileInputManager.clearInput();
    this.origin = null;
  }
}


export default MobileInputManager;
