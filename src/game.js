import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import colors, { lightColors } from './colors';
import { degreesToRadians } from './utils/math';

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
  // eslint-disable-next-line no-use-before-define
  draw();
};

/* *********
* Renderer *
********** */
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);


/* ******
* Scene *
******* */
const scene = new THREE.Scene();
scene.background = new THREE.Color(colors.black);


/* *******
* Lights *
******** */
const ambientLight = new THREE.AmbientLight(lightColors.softWhite, 0.7); // soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(lightColors.white, 1.5, 50);
pointLight.position.set(0, 4, -5);
pointLight.castShadow = true;
pointLight.shadowDarkness = 2;

pointLight.shadowCameraVisible = true; // for debugging
scene.add(pointLight);


/* *******
* Camera *
******** */
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000,
);
camera.position.set(0, 2, -8);
camera.lookAt(scene.position);


/* 🐷🐷🐷🐷🐷
* PIG MODEL *
🐷🐷🐷🐷🐷🐷 */
let pig;

const loader = new GLTFLoader(loadingManager);

const pigLoadCallback = gltf => { // TODO: ECS
  pig = gltf.scene;
  pig.rotation.y += degreesToRadians(30);
  camera.lookAt(pig.position);
  scene.add(pig);
};


/* ********
* LOADERS *
********** */
loader.load( // pig
  'models/pig.glb',
  pigLoadCallback,
  xhr => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
  err => console.error(err),
);

/* ***************
* Main Game Loop *
**************** */
const draw = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
};

/* *********************
* MISC EVENT LISTENERS *
********************** */
const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', onWindowResize);


export default renderer;
