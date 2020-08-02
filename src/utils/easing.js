export const easeInOutSine = (
  elapsed, initialValue, amountOfChange, duration,
) => (-amountOfChange / 2) * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;

export const easeInExpo = (
  elapsed, initialValue, amountOfChange, duration,
) => (elapsed === 0 ? initialValue : amountOfChange * (2 ** (10 * (elapsed / duration - 1))) + initialValue);

// goes from 0 to 1 to 0
export const fullSineEase = (
  elapsed, initialValue, amountOfChange, duration,
) => {
  const percentage = Math.sin(Math.PI * (elapsed / duration));
  const scalar = initialValue + (amountOfChange - initialValue);
  return percentage * scalar;
};
