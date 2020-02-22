const handleStart = e => console.log('handle start', e);
const handleEnd = e => console.log('handle end', e);
const handleCancel = e => console.log('handle cancel', e);
const handleMove = e => console.log('handle move', e);

const initializeMobile = () => {
  const el = document.getElementById('canvas-container').children[0];
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchend', handleEnd, false);
  el.addEventListener('touchcancel', handleCancel, false);
  el.addEventListener('touchmove', handleMove, false);
};

export default initializeMobile;
