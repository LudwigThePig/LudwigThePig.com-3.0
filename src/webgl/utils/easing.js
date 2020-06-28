// eslint-disable-next-line import/prefer-default-export
export const easeInOutSine = (
  elapsed, initialValue, amountOfChange, duration,
) => (-amountOfChange / 2) * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
