import initializeKeyboard from './keyboardInput';
import initializeMobile from './mobileInput';

const isMobile = () => ((window.innerHeight <= 800) && (window.innerWidth <= 600));

const inputHandler = () => {
  if (isMobile()) {
    initializeMobile();
  } else {
    initializeKeyboard();
  }
};


export default inputHandler;
