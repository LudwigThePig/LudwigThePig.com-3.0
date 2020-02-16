import initializeKeyboard from './keyboardInput';

const isMobile = () => ((window.innerWidth <= 800) && (window.innerHeight <= 600));

const inputHandler = () => {
  if (isMobile()) {
    console.log('I\'m  a mobile device!');
  } else {
    initializeKeyboard();
  }
};


export default inputHandler;
