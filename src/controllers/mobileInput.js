import { inputState } from './movement';


// This is more of a giant function than a class, but this is easier to read
class MobileInputManager {
  constructor() {
    this.origin = null;
    const el = document.getElementById('canvas-container').children[0];
    el.addEventListener('touchstart', this.handleStart, false);
    el.addEventListener('touchend', MobileInputManager.handleEnd, false);
    el.addEventListener('touchmove', this.handleMove, false);
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

    if (this.origin.x < x - tolerance) {
      inputState.right = true;
      inputState.left = false;
    } else if (this.origin.x > x + tolerance) {
      inputState.right = false;
      inputState.left = true;
    } else {
      inputState.right = false;
      inputState.left = false;
    }

    if (this.origin.y < y - tolerance) {
      inputState.down = true;
      inputState.up = false;
    } else if (this.origin.y > y + tolerance) {
      inputState.down = false;
      inputState.up = true;
    } else {
      inputState.up = false;
      inputState.down = false;
    }
  }


  handleEnd() {
    inputState.up = false;
    inputState.down = false;
    inputState.left = false;
    inputState.right = false;
    this.origin = null;
  }
}


export default MobileInputManager;
