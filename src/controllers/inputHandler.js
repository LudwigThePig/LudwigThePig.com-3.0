import initializeKeyboard from './keyboardInput';

const isMobile = () => ((window.innerHeight <= 800) && (window.innerWidth <= 600));

const inputHandler = () => {
  if (isMobile()) {
    console.log('I\'m  a mobile device!');
  } else {
    initializeKeyboard();
  }
};


export default inputHandler;
