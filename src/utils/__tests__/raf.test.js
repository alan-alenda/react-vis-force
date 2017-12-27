jest.mock('global');

const { window } = require('global');

/* eslint-disable global-require */
describe('RAF utils', () => {
  describe('requestAnimationFrame()', () => {
    afterEach(() => window.setRafSupport(true));

    it('should call window.requestAnimationFrame', () => {
      window.setRafSupport(true);

      const rafUtils = require('../raf');

      const fn = jest.fn();

      rafUtils.requestAnimationFrame(fn);

      expect(window.requestAnimationFrame).toBeCalledWith(fn);
    });

    it('should call the function if RAF is not available', () => {
      window.setRafSupport(false);

      const rafUtils = require('../raf');

      const fn = jest.fn();

      rafUtils.requestAnimationFrame(fn);

      expect(fn).toBeCalled();
    });
  });

  describe('cancelAnimationFrame()', () => {
    afterEach(() => window.setRafSupport(true));

    it('should call window.cancelAnimationFrame', () => {
      window.setRafSupport(true);

      const rafUtils = require('../raf');

      const frame = 12345;

      rafUtils.cancelAnimationFrame(frame);

      expect(window.cancelAnimationFrame).toBeCalledWith(frame);
    });

    it('should call the function if RAF is not available', () => {
      window.setRafSupport(false);

      const rafUtils = require('../raf');

      const frame = 12345;

      expect(() => rafUtils.cancelAnimationFrame(frame)).not.toThrow();
    });
  });
});
/* eslint-enable global-require */
