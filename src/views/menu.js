import initBackground from './menuBackground';

const HIDDEN_CLASS = 'hidden';
/**
 * @param {boolean} showMenu if true, will blur game and show menu
 * if false, will hide menu and unblur game
 */
const toggleMenu = (showMenu = false) => (e) => {
  const menu = document.getElementById('menu-ctr');
  const hud = document.getElementById('hud-ctr');
  const canvasContainer = document.getElementById('canvas-container');
  if (showMenu) {
    canvasContainer.classList.add('blur');
    hud.classList.add(HIDDEN_CLASS);
    menu.classList.remove(HIDDEN_CLASS);
  } else {
    canvasContainer.classList.remove('blur');
    hud.classList.remove(HIDDEN_CLASS);
    menu.classList.add(HIDDEN_CLASS);
  }
};

const toggleAbout = menuState => e => {
  const getSectionEl = section => document.getElementById(`menu-section-${section}`);
  const mainEl = getSectionEl('main');
  const aboutEl = getSectionEl('about');
  if (menuState.isShowingAbout) {
    aboutEl.classList.add(HIDDEN_CLASS);
    mainEl.classList.remove(HIDDEN_CLASS);
  } else {
    aboutEl.classList.remove(HIDDEN_CLASS);
    mainEl.classList.add(HIDDEN_CLASS);
  }
  menuState.isShowingAbout = !menuState.isShowingAbout;
};

const init = () => {
  const menuState = {
    isShowingAbout: false,
  };
  const startGameButton = document.getElementById('start-game-button');
  const showMenuButton = document.getElementById('show-menu-button');
  const showAboutButtons = document.querySelectorAll('.toggle-about-button');

  startGameButton.addEventListener('click', toggleMenu(false));
  showMenuButton.addEventListener('click', toggleMenu(true));
  showAboutButtons.forEach(el => el.addEventListener('click', toggleAbout(menuState)));

  initBackground();
};

export default init;
