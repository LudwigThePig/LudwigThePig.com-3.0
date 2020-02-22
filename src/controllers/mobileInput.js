import { inputState } from './movement';

let origin;
const getTouchPos = e => ({ x: e.touches[0].screenX, y: e.touches[0].screenY });

const handleStart = e => {
  origin = getTouchPos(e);
};

const handleEnd = () => {
  inputState.up = false;
  inputState.down = false;
  inputState.left = false;
  inputState.right = false;
  origin = null;
};


const handleMove = e => {
  const tolerance = 100;
  const { x, y } = getTouchPos(e);

  if (origin.x < x - tolerance) {
    inputState.right = true;
    inputState.left = false;
  } else if (origin.x > x + tolerance) {
    inputState.right = false;
    inputState.left = true;
  } else {
    inputState.right = false;
    inputState.left = false;
  }

  if (origin.y < y - tolerance) {
    inputState.down = true;
    inputState.up = false;
  } else if (origin.y > y + tolerance) {
    inputState.down = false;
    inputState.up = true;
  } else {
    inputState.up = false;
    inputState.down = false;
  }
};

const initializeMobile = () => {
  const el = document.getElementById('canvas-container').children[0];
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchend', handleEnd, false);
  el.addEventListener('touchmove', handleMove, false);
};

export default initializeMobile;
