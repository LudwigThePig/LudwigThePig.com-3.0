import initBackground from './menuBackground';

/**
 * @param {boolean} showMenu if true, will blur game and show menu
 * if false, will hide menu and unblur game
 */
const toggleMenu = (showMenu = false) => e => {
  const menu = document.querySelector('#menu-ctr');
  const hud = document.querySelector('#hud-ctr');
  const canvasContainer = document.querySelector('#canvas-container');
  if (showMenu) {
    canvasContainer.classList.add('blur');
    hud.classList.add('hidden');
    menu.classList.remove('hidden');
  } else {
    canvasContainer.classList.remove('blur');
    hud.classList.remove('hidden');
    menu.classList.add('hidden');
  }
};


const init = () => {
  const startGameButton = document.getElementById('start-game-button');
  const showMenuButton = document.getElementById('show-menu-button');

  startGameButton.addEventListener('click', toggleMenu(false));
  showMenuButton.addEventListener('click', toggleMenu(true));

  initBackground();
};

export default init;
