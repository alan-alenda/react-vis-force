import PropTypes from 'prop-types';

export const DEFAULT_SIMULATION_PROPS = {
  animate: false,
  width: 900,
  height: 600,
  strength: {},
};

export default PropTypes.shape({
  data: PropTypes.object,
  animate: PropTypes.bool,
  alpha: PropTypes.number,
  alphaDecay: PropTypes.number,
  alphaMin: PropTypes.number,
  alphaTarget: PropTypes.number,
  velocityDecay: PropTypes.number,
  radiusMargin: PropTypes.number,
  linkAttrs: PropTypes.array,
  nodeAttrs: PropTypes.array,

  // strengths
  strength: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.number])
  ),
});
