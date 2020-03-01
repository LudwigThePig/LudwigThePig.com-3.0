import './styles.scss';
import 'normalize.css';
import renderer from './game';


window.onload = () => {
  document.getElementById('canvas-container').appendChild(renderer.domElement);
};
