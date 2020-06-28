export const randomBool = () => Math.random() > 0.5;

export const randomArrayItem = arr => {
  const index = Math.floor((arr.length) * Math.random());
  return arr[index];
};

export const randomBoundedInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomBoundedFloat = (min, max) => (Math.random() * (max - min + 1)) + min;
