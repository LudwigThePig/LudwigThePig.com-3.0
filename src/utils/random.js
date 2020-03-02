export const randomBool = () => Math.random() > 0.5;

export const randomArrayItem = arr => {
  const index = (arr.length - 1) * Math.random();
  return arr[index];
};

export const randomBoundedInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
