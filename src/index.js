import './styles.scss';
import 'normalize.css';
import initGame from './game';
import showMenu from './views/menu';


window.onload = () => {
  showMenu();
  setTimeout(() => {
    const renderer = initGame();
    document.getElementById('canvas-container').appendChild(renderer.domElement);
  }, 1000);
};
