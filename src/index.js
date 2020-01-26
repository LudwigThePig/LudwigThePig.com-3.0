import './styles.scss';
import 'normalize.css';
import renderer from './game';

console.log('hi 🙋‍♂️');


window.onload = () => {
  document.getElementById('canvas-container').appendChild(renderer.domElement);
};
