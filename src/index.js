import './styles.scss';
import 'normalize.css';
import initGame from './game';
import showMenu from './views/menu';
import inputHandler from './controllers/inputHandler';


window.onload = async () => {
  showMenu();
  const renderer = await initGame();
  document.getElementById('canvas-container').appendChild(renderer.domElement);
  inputHandler();
};
