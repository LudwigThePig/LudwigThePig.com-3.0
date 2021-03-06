import initializeKeyboard from './keyboardInput';
import MobileInputManager from './mobileInput';

const isMobile = () => ((window.innerHeight <= 1000) && (window.innerWidth <= 600));

const inputHandler = () => {
  if (isMobile()) {
    const mobileInput = new MobileInputManager();
  } else {
    initializeKeyboard();
  }
};


export default inputHandler;
