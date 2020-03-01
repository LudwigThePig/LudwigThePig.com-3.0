class MenuHandler {
  constructor(toggler) {
    this.isActive = false;
    this.togglerEl = toggler;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.menuCtrEl = document.getElementById('menu');
  }

  toggleMenu() {
    if (this.isActive) {
      this.togglerEl.classList.remove('is-active');
      this.menuCtrEl.classList.remove('is-active');
    } else {
      this.togglerEl.classList.add('is-active');
      this.menuCtrEl.classList.add('is-active');
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
