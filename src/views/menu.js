class MenuHandler {
  constructor(toggler) {
    this.isActive = false;
    this.togglerEl = toggler;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.menuCtrEl = document.getElementById('menu');
    this.menuContentEl = document.getElementById('menu-content');
  }

  toggleMenu() {
    if (this.isActive) {
      this.togglerEl.classList.remove('is-active');
      this.menuCtrEl.classList.remove('is-active');
      setTimeout(() => this.menuContentEl.classList.add('hidden'), 1000);
    } else {
      this.togglerEl.classList.add('is-active');
      this.menuCtrEl.classList.add('is-active');
      this.menuContentEl.classList.remove('hidden');
    }
    this.isActive = !this.isActive;
  }
}


const init = () => {
  const toggleMenuButton = document.getElementById('menu-button');
  const menuHandler = new MenuHandler(toggleMenuButton);

  document.getElementsByClassName('ui');
  toggleMenuButton.addEventListener('click', menuHandler.toggleMenu);
};

export default init;
