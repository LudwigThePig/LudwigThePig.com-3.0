const getTouchPos = e => ({ x: e.touches[0].screenX, y: e.touches[0].screenY });

let origin;
const handleStart = e => {
  origin = getTouchPos(e);
};
const handleEnd = e => console.log('handle end', e);
const handleCancel = e => console.log('handle cancel', e);
const handleMove = e => {
  const { x, y } = getTouchPos(e);

  if (origin.x < x) console.log('right!');
  else console.log('left!');
  console.log('handle move', e);

  if (origin.y < y) console.log('down!');
  else console.log('up!');
};

const initializeMobile = () => {
  const el = document.getElementById('canvas-container').children[0];
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchend', handleEnd, false);
  el.addEventListener('touchcancel', handleCancel, false);
  el.addEventListener('touchmove', handleMove, false);
};

export default initializeMobile;
