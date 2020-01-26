import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import showMenu from './views/menu';
import colors, { lightColors } from './utils/colors';
import { degreesToRadians } from './utils/math';

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
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


/* 🐷🐷🐷🐷🐷
* PIG MODEL *
🐷🐷🐷🐷🐷🐷 */
const geometry = new THREE.TetrahedronGeometry(2, 0);
// const geom = new THREE.IcosahedronGeometry(7, 1);
// const geom2 = new THREE.IcosahedronGeometry(15, 1);
const particle = new THREE.Object3D();

const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading,
});

for (let i = 0; i < 1000; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  mesh.position.multiplyScalar(90 + (Math.random() * 700));
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  particle.add(mesh);
}
scene.add(particle);


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
  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;

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
