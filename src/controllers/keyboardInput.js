import { inputState } from './inputHandler';

const keyboardDictionary = {
  87: 'up', // W
  83: 'down', // S
  65: 'left', // A
  68: 'right', // D
  32: 'jump', // space
  16: 'slide', // shift
  67: 'slide', // C
};

const getKeyCode = event => event.which;
const keydown = event => {
  const command = keyboardDictionary[getKeyCode(event)];
  inputState[command] = true;
};
const keyup = event => {
  const command = keyboardDictionary[getKeyCode(event)];
  inputState[command] = true;
};

const initializeKeyboard = () => {
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
};

export default initializeKeyboard;
