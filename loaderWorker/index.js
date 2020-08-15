import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

onmessage = message => {
  console.log(message);
  postMessage('Shut up dad');
};
