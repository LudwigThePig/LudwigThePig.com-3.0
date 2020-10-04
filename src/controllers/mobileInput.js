import game from '../gameState';
import { getCanvasDimensions } from '../utils/dimensions';


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
    game.inputs.jump = false;
    game.inputs.slide = false;
  }

  static getTouchesPos(e) {
    const getPos = touch => ({ x: touch.screenX, y: touch.screenY })
    const [firstTouch, secondTouch] = e.touches;
    return {
      primary: getPos(firstTouch),
      secondary: secondTouch ? getPos(secondTouch) : null,
    };
  }

  static isInTopHalfOfScreen(yPos) {
    const { height } = getCanvasDimensions();
    return yPos < (height / 2);
  }

  handleStart(e) {
    this.origin = MobileInputManager.getTouchesPos(e).primary;
  }


  handleMove(e) {
    const tolerance = 50;
    const { primary, secondary } = MobileInputManager.getTouchesPos(e);
    MobileInputManager.clearInput();

    if (this.origin.x < primary.x - tolerance)
      game.inputs.right = true;
    else if (this.origin.x > primary.x + tolerance)
      game.inputs.left = true;

    if (this.origin.y < primary.y - tolerance)
      game.inputs.down = true;
    else if (this.origin.y > primary.y + tolerance)
      game.inputs.up = true;

    if (secondary !== null) {
      if (MobileInputManager.isInTopHalfOfScreen(secondary.y))
        game.inputs.jump = true;
      else // in bottom half of screen...
        game.inputs.slide = true;
    }

  }


  handleEnd() {
    MobileInputManager.clearInput();
    this.origin = null;
  }
}


export default MobileInputManager;
