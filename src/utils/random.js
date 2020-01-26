export const randomBool = () => Math.random() > 0.5;

export const randomArrayItem = arr => {
  const index = (arr.length - 1) * Math.random();
  return arr[index];
};
