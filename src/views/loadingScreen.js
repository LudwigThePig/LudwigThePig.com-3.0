const loadingScreenCtr = document.getElementById('loading-screen');
export const showLoadingScreen = () => {};
export const hideLoadingScreen = () => {
  loadingScreenCtr.classList.add('hidden-animation');
  setTimeout(() => {
    loadingScreenCtr.classList.add('hidden');
  }, 3000);
};
