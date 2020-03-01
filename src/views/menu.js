class MenuHandler {
  constructor(toggler) {
    this.isActive = false;
    this.toggler = toggler;
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    if (this.isActive)
      this.toggler.classList.remove('is-active');
    else
      this.toggler.classList.add('is-active');
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
