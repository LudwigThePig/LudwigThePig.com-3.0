import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ParticleSystem from 'three-particle-system';

import { updatePosition, movePlayer } from './controllers/movement';

import Player from './entities/player';
import game from './gameState';
import { isBroadCollision, isNarrowCollision, handleCollision } from './physics/collisionDetection';
import { applyForces } from './physics/forces';
import colors, { lightColors } from './utils/colors';
import { degreesToRadians } from './utils/math';
import { randomBoundedInt } from './utils/random';
import { hideLoadingScreen } from './views/loadingScreen';
import showMenu from './views/menu';
import updateCloudsPosition from './controllers/clouds';
import { sleep } from './utils/misc';
import { applyBuoyancy } from './physics/buoyancy';


/**
 * Bootstraps the scene and returns the renderer
 */
const init = resolver => {
  const loadingManager = new THREE.LoadingManager();

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
  const ambientLight = new THREE.AmbientLight(lightColors.white, 0.8); // soft white light
  scene.add(ambientLight);

  const topRightLight = new THREE.PointLight(colors.white, 0.2, 50, 0);
  topRightLight.position.set(0, 5, 0);
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
  camera.position.set(0, 1, -8);
  camera.lookAt(scene.position);


  /* 🐷🐷🐷🐷🐷
    * PIG MODEL *
    🐷🐷🐷🐷🐷🐷 */
  let pig;
  const pigLoader = new GLTFLoader(loadingManager);
  const pigBoatLoader = new GLTFLoader(loadingManager);
  const skyboxLoader = new THREE.CubeTextureLoader(loadingManager);
  const groundTextureLoader = new THREE.TextureLoader(loadingManager);
  const cloudLoader = new GLTFLoader(loadingManager);
  const fontLoader = new THREE.FontLoader(loadingManager);

  let pigBoat;
  const pigBoatLoadCallback = async gltf => {
    pigBoat = gltf.scene;
    pigBoat.name = 'PigBoat';
    pigBoat.traverse(child => {
      if (child.isMesh) child.material.side = THREE.DoubleSide;
    });
    // eslint-disable-next-line no-await-in-loop
    while (!pig) await sleep(200); // wait until pig is here
    pig.add(pigBoat);
    const scale = 1.5;
    pigBoat.position.set(0, -1, -1);
    pigBoat.scale.set(scale, scale, scale);
    pigBoat.rotation.set(0, 0, 0);
  };

  let pigPointer;
  const pigLoadCallback = gltf => { // TODO: ECS
    pig = gltf.scene;
    pig.children[2].material = new THREE.MeshToonMaterial({
      color: colors.pink,
      bumpScale: 1,
      shininess: 1,
    });
    const pigObj = new Player(pig, 40);
    pigObj.mesh.name = 'pig';
    pigObj.mesh.type = 'pig';

    pigPointer = game.createEntity();
    game.pig = pigPointer;
    game.meshes[pigPointer] = pigObj.mesh;
    game.collidables[pigPointer] = pigObj.mesh;
    game.physics[pigPointer] = pigObj.physics;
    game.buoyant[pigPointer] = pigPointer;

    pig.rotation.y += degreesToRadians(30);
    camera.lookAt(pig.position);
    scene.add(pig);
    pig.position.y = game.groundPos;

    const pigBody = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(pig.position.x, pig.position.y, pig.position.z),
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    });
    game.world.addBody(pigBody);
    pigBody.angularVelocity.set(0, 10, 0);

    game.physics[pigPointer] = pigBody;


    const particleTarget = new THREE.Object3D();
    particleTarget.position.set(-0.7, -2.4, -3.4);
    particleTarget.rotateX(Math.PI / 3);
    particleTarget.rotateY(Math.PI / 3);
    pig.add(particleTarget);
    game.pigParticles = new ParticleSystem(particleTarget, {
      particleVelocity: 1,
      playOnLoad: false,
      loop: false,
      color: colors.blue,
      maxParticles: 1000,
      particleLifetime: 1000,
      duration: 200,
      particlesPerSecond: 100,
      worldSpace: true,
    });
  };


  /* ☁☁☁☁☁☁☁☁
    * CLOUD MODEL *
    ☁☁☁☁☁☁☁☁ */
  const clouds = [];
  const cloudLoadCallback = gltf => {
    for (let i = 0; i < 20; i++) {
      const cloud = gltf.scene.clone();
      cloud.children[2].material = new THREE.MeshToonMaterial({
        color: 0xFFFFFF,
        emissive: 0,
        emissiveIntensity: 0,
        bumpScale: 1,
        shininess: 1,
      });

      cloud.position.x = randomBoundedInt(-20, 20);
      cloud.position.y = randomBoundedInt(5, 8);
      cloud.position.z = randomBoundedInt(-20, 20);
      cloud.rotation.y = degreesToRadians(randomBoundedInt(0, 360));
      clouds.push(cloud);
      scene.add(cloud);
    }
  };

  /* *************
  * Font Loader *
  ************* */
  const fontLoadCallback = font => {
    const textGeometry = new THREE.TextGeometry('Ludwig The Pig', {
      font,
      size: 5,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const textMaterial = new THREE.MeshToonMaterial({
      color: colors.white,
      shininess: 0,
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 6;
    textMesh.position.y = 5;
    textMesh.position.x = 20;
    textMesh.rotation.y = degreesToRadians(180);
    scene.add(textMesh);
  };


  /* ********
  * LOADERS *
  ********** */
  pigBoatLoader.load(
    'models/pigboat.glb',
    pigBoatLoadCallback,
    null,
    console.error,
  );

  pigLoader.load( // pig
    'models/pig.glb',
    pigLoadCallback,
    null,
    console.error,
  );

  cloudLoader.load(
    'models/cloud.glb',
    cloudLoadCallback,
    null,
    console.error,
  );

  fontLoader.load(
    'fonts/gentilis_regular.typeface.json',
    fontLoadCallback,
  );

  const skyboxTexture = skyboxLoader.load([
    'textures/skybox/z-plus.png',
    'textures/skybox/z-minus.png', // should be minus
    'textures/skybox/y-plus.png',
    'textures/skybox/y-minus.png',
    'textures/skybox/x-plus.png',
    'textures/skybox/x-minus.png',
  ]);
  scene.background = skyboxTexture;


  /* **************
  * Ground Model *
  ************** */
  const groundTexture = groundTextureLoader.load('textures/water.png');

  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(200, 200);
  const groundGeometry = new THREE.PlaneGeometry(2000, 2000);
  const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = degreesToRadians(-90);
  groundMesh.position.y = -1;
  scene.add(groundMesh);


  /* ***************
  * Main Game Loop *
  **************** */
  const draw = () => {
    game.updateDeltaTime();
    game.world.step(game.dt);
    // Collision Detection
    for (let i = 0; i < game.collidables.length - 1; i++) {
      for (let j = i + 1; j < game.collidables.length; j++) {
        if (isBroadCollision(game.collidables[i], game.collidables[j])
        && isNarrowCollision(game.collidables[i], game.collidables[j])) {
          handleCollision(game.physics[i], game.physics[j]);
        }
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(draw);

    camera.lookAt(pig.position);
    updateCloudsPosition(clouds);
    game.meshes[pigPointer].position.copy(game.physics[pigPointer].position);
    // movePlayer(game.meshes[game.pig], game.inputs);

    applyBuoyancy(game.buoyant[pigPointer]);
    // for (let ptr = 0; ptr < game.physics.length; ptr++) {
    //   applyForces(ptr);
    // }

    game.pigParticles.update();
  };


  /** **************************************
   * * After load, before appending canvas *
   *************************************** */
  loadingManager.onLoad = () => {
    hideLoadingScreen();
    draw();
    showMenu();
    resolver(renderer);
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
};

export default () => new Promise(resolver => init(resolver));
