// better to call this edge?
import PropTypes from 'prop-types';

export default PropTypes.shape({
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  value: PropTypes.number,
});
