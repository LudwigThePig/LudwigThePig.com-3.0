import { inputState } from './movement';


// This is more of a giant function than a class, but this is easier to read
class MobileInputManager {
  constructor() {
    this.origin = null;

    const el = document.getElementById('canvas-container').children[0];
    el.addEventListener('touchstart', this.handleStart, false);
    el.addEventListener('touchend', this.handleEnd, false);
    el.addEventListener('touchmove', this.handleMove, false);
  }

  static clearInput() {
    inputState.up = false;
    inputState.down = false;
    inputState.left = false;
    inputState.right = false;
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
      inputState.right = true;
    else if (this.origin.x > x + tolerance)
      inputState.left = true;

    if (this.origin.y < y - tolerance)
      inputState.down = true;
    else if (this.origin.y > y + tolerance)
      inputState.up = true;
  }


  handleEnd() {
    MobileInputManager.clearInput();
    this.origin = null;
  }
}


export default MobileInputManager;
