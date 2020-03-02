import { easeInOutSine } from '../utils/easing';

let direction = 1;
let time = 0;
const totalDuration = 600;
const maxSpeed = 0.05;

const updateCloudsPosition = clouds => {
  time += 1;
  if (time === totalDuration) {
    direction *= -1;
    time = 0;
  }

  clouds.forEach(cloud => {
    const speed = (easeInOutSine(time, 0, maxSpeed, totalDuration / 2));
    cloud.position.x += speed * direction;
    cloud.position.z += speed * direction;
  });
};

export default updateCloudsPosition;
