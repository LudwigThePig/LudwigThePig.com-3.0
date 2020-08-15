import './styles.scss';
import 'normalize.css';
// import renderer from './game';
import showMenu from './views/menu';


window.onload = () => {
  showMenu();
  // document.getElementById('canvas-container').appendChild(renderer.domElement);
};
