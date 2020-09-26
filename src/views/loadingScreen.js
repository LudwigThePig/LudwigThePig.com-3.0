export const showLoadingScreen = () => {};
export const hideLoadingScreen = () => {
  const loadingScreenCtr = document.getElementById('loading-screen');
  const menuCtr = document.getElementById('menu-ctr');
  menuCtr.classList.remove('hidden');
  loadingScreenCtr.classList.add('hidden');
};
