import { window } from 'global';

export const requestAnimationFrame = (fn, ...rest) => {
  if (window && {}.hasOwnProperty.call(window, 'cancelAnimationFrame')) {
    window.requestAnimationFrame(fn, ...rest);
  } else {
    fn(...rest);
  }
};

export const cancelAnimationFrame = (...args) => {
  if (window && {}.hasOwnProperty.call(window, 'cancelAnimationFrame')) {
    window.cancelAnimationFrame(...args);
  }
};
