import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import showMenu from './views/menu';
import colors, { lightColors } from './utils/colors';
import { degreesToRadians } from './utils/math';
import { randomBool } from './utils/random';
import { keyboardInputs, updatePosition } from './controllers/movement';
import { hideLoadingScreen } from './views/loadingScreen';
import inputHandler from './controllers/inputHandler';

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
  hideLoadingScreen();
  // eslint-disable-next-line no-use-before-define
  draw();
  showMenu();
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

const bottomLeftLight = new THREE.PointLight(colors.blue, 3.5, 50);
bottomLeftLight.position.set(-3, -2, -5);
bottomLeftLight.castShadow = true;
bottomLeftLight.shadowDarkness = 2;

bottomLeftLight.shadowCameraVisible = true; // for debugging
scene.add(bottomLeftLight);
const topRightLight = new THREE.PointLight(colors.orange, 3.5, 50);
topRightLight.position.set(3, 2, -5);
topRightLight.castShadow = true;
topRightLight.shadowDarkness = 2;

topRightLight.shadowCameraVisible = true; // for debugging
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


/* *********************
* Background Particles *
********************** */
const geometry = new THREE.TetrahedronGeometry(2, 0);
const particle = new THREE.Object3D();


for (let i = 0; i < 1000; i++) {
  const material = new THREE.MeshPhongMaterial({
    color: [colors.blue, colors.white, colors.orange][Math.floor(Math.random() * 3)],
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  mesh.position.multiplyScalar(90 + (Math.random() * 700));
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  particle.add(mesh);
}
scene.add(particle);

let rotationSpeed = 1;
let rotationDirection = 1;
const updateParticleRotation = () => {
  if (rotationSpeed >= 1) rotationDirection = -1;
  if (rotationSpeed <= -1) rotationDirection = 1;
  rotationSpeed += ((Math.cos(Math.PI * rotationSpeed) + 1) / 2 * rotationDirection);
  particle.rotation.x += rotationSpeed * 0.002;
  particle.rotation.y += rotationSpeed * 0.002;
};


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
  updateParticleRotation();
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
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

inputHandler();

export default renderer;
