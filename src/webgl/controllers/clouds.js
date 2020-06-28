import { easeInOutSine } from '../utils/easing';

let direction = 1;
let time = 0;
const totalDuration = 15000;
const maxSpeed = 0.002;


const xNoise = new Array(20).fill('').map(() => (1 + (Math.random() - 0.5)));
const zNoise = new Array(20).fill('').map(() => (1 + (Math.random() - 0.5)));

const updateCloudsPosition = clouds => {
  time += 1;
  if (time === totalDuration) {
    direction *= -1;
    time = 0;
  }
  const speed = (easeInOutSine(time, 0.001, maxSpeed, totalDuration / 2));

  clouds.forEach((cloud, i) => {
    cloud.position.x += speed * direction * xNoise[i];
    cloud.position.z += speed * direction * zNoise[i];
  });
};

export default updateCloudsPosition;
