// purely for development purposes
const xEl = document.createElement('p');
const yEl = document.createElement('p');
const zEl = document.createElement('p');
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


const initializeGyroscope = () => {
  const a = 'b';
  gyroscopeDevConsole.init();
  gyroscopeDevConsole.update(xEl, 'hello!');
  return a;
};

export default initializeGyroscope;
