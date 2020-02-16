// purely for development purposes
const xEl = document.createElement('p');
xEl.innerText = 'X';
const yEl = document.createElement('p');
yEl.innerText = 'Y';
const zEl = document.createElement('p');
zEl.innerText = 'Z';
const gyroscopeDevConsole = {
  init: () => {
    const parentEl = document.body;
    const consoleDiv = document.createElement('div');
    consoleDiv.style.position = 'absolute';
    consoleDiv.style.left = 0;
    consoleDiv.style.top = 0;
    consoleDiv.style.background = '#121212aa';
    consoleDiv.appendChild(xEl);
    consoleDiv.appendChild(yEl);
    consoleDiv.appendChild(zEl);
    parentEl.appendChild(consoleDiv);
  },
  update: (el, text) => {
    el.innerText = text;
  },
};


let gyroscope;

const onGyroscopeEvent = e => {
  gyroscopeDevConsole.update(xEl, 'gyroscope.x');
  gyroscopeDevConsole.update(yEl, 'gyroscope.y');
  gyroscopeDevConsole.update(zEl, 'gyroscope.z');
};

const initializeGyroscope = () => {
  gyroscopeDevConsole.init();
  // eslint-disable-next-line no-undef
  try {
    gyroscope = new LinearAccelerationSensor({ frequency: 60 });
  } catch (err) {
    gyroscopeDevConsole.update(xEl, 'Shit is broken');
  }
  gyroscope.addEventListener('reading', onGyroscopeEvent);
  gyroscope.addEventListener('error', e => { gyroscopeDevConsole.update(xEl, JSON.stringify(e)); });
  gyroscope.addEventListener('activate', e => { gyroscopeDevConsole.update(xEl, JSON.stringify(e)); });

  gyroscope.start();
};

export default initializeGyroscope;
