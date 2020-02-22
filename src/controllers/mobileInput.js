import { inputState } from './movement';

const getTouchPos = e => ({ x: e.touches[0].screenX, y: e.touches[0].screenY });

let origin;
const handleStart = e => {
  origin = getTouchPos(e);
};
const handleEnd = e => console.log('handle end', e);
const handleCancel = e => console.log('handle cancel', e);
const handleMove = e => {
  const { x, y } = getTouchPos(e);

  if (origin.x < x) {
    inputState.right = true;
    inputState.left = false;
  } else {
    inputState.right = false;
    inputState.left = true;
  }

  if (origin.y < y) {
    inputState.down = true;
    inputState.up = false;
  } else {
    inputState.down = false;
    inputState.up = true;
  }
};

const initializeMobile = () => {
  const el = document.getElementById('canvas-container').children[0];
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchend', handleEnd, false);
  el.addEventListener('touchcancel', handleCancel, false);
  el.addEventListener('touchmove', handleMove, false);
};

export default initializeMobile;
