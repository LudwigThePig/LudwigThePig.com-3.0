import initializeKeyboard from './keyboardInput';
import initializeGyroscope from './mobileInput';

const isMobile = () => ((window.innerHeight <= 800) && (window.innerWidth <= 600));

const inputHandler = () => {
  if (isMobile()) {
    initializeGyroscope();
  } else {
    initializeKeyboard();
  }
};


export default inputHandler;
