import { easeInOutSine } from '../utils/easing';

let direction = 1;
let time = 0;
const totalDuration = 15000;
const maxSpeed = 0.003;

const updateCloudsPosition = clouds => {
  time += 1;
  if (time === totalDuration) {
    direction *= -1;
    time = 0;
  }
  const speed = (easeInOutSine(time, 0.001, maxSpeed, totalDuration / 2));
  console.log(speed);
  clouds.forEach(cloud => {
    cloud.position.x += speed * direction;
    cloud.position.z += speed * direction;
  });
};

export default updateCloudsPosition;
