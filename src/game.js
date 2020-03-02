import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import showMenu from './views/menu';
import colors, { lightColors } from './utils/colors';
import { degreesToRadians } from './utils/math';
import { updatePosition } from './controllers/movement';
import { hideLoadingScreen } from './views/loadingScreen';
import inputHandler from './controllers/inputHandler';

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
  hideLoadingScreen();
  // eslint-disable-next-line no-use-before-define
  draw();
  showMenu();
  setTimeout(() => inputHandler(), 500); // Must wait for the canvas to render
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
const ambientLight = new THREE.AmbientLight(lightColors.softWhite, 1.2); // soft white light
scene.add(ambientLight);

const topRightLight = new THREE.PointLight(colors.orange, 1, 50);
topRightLight.position.set(3, 2, -5);
topRightLight.castShadow = true;
scene.add(topRightLight);


/* *******
* Camera *
******** */
const camera = new THREE.PerspectiveCamera(
  90,
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

const pigLoader = new GLTFLoader(loadingManager);

const pigLoadCallback = gltf => { // TODO: ECS
  pig = gltf.scene;

  pig.children[2].material = new THREE.MeshToonMaterial({
    color: colors.purple,
    bumpScale: 1,
    shininess: 1,
  });

  pig.rotation.y += degreesToRadians(30);
  camera.lookAt(pig.position);
  scene.add(pig);
};


/* ********
* LOADERS *
********** */
pigLoader.load( // pig
  'models/pig.glb',
  pigLoadCallback,
  xhr => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
  err => console.error(err),
);

const skyboXloader = new THREE.CubeTextureLoader();
const texture = skyboXloader.load([
  'textures/skybox/z-plus.png',
  'textures/skybox/z-minus.png', // should be minus
  'textures/skybox/y-plus.png',
  'textures/skybox/y-minus.png',
  'textures/skybox/x-plus.png',
  'textures/skybox/x-minus.png',
]);
scene.background = texture;

/* ***************
* Main Game Loop *
**************** */
const draw = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
  camera.lookAt(pig.position);
  updatePosition(pig);
};


setInterval(() => {
}, 10);

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
