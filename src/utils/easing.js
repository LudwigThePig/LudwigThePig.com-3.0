// First two functions are from js-easing-functions with some modifications
// You can view the license for that product here:
// https://github.com/bameyrick/js-easing-functions/blob/master/LISENCE.txt

export const easeInOutSine = (
  elapsed, initialValue, amountOfChange, duration,
) => (-amountOfChange / 2) * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;

export const easeInExpo = (
  elapsed, initialValue, amountOfChange, duration,
) => (elapsed === 0 ? initialValue : amountOfChange * (2 ** (10 * (elapsed / duration - 1))) + initialValue);

export const easeInOutQuad = (
  elapsed, initialValue, amountOfChange, duration,
) => {
  if ((elapsed /= duration / 2) < 1) {
    return amountOfChange / 2 * elapsed * elapsed + initialValue;
  }
  return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
};


// goes from 0 to 1 to 0
export const fullSineEase = (
  elapsed, initialValue, amountOfChange, duration,
) => {
  const percentage = Math.sin(Math.PI * (elapsed / duration));
  const scalar = initialValue + (amountOfChange - initialValue);
  return percentage * scalar;
};
