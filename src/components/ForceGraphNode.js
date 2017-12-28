import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import nodePropTypes from '../propTypes/node';

export default class ForceGraphNode extends PureComponent {
  static get propTypes() {
    return {
      node: nodePropTypes.isRequired,
      cx: PropTypes.number,
      cy: PropTypes.number,
      r: PropTypes.number,
      xlinkhref: PropTypes.string,
      className: PropTypes.string,
      // these props only have an impact on the parent.
      labelStyle: PropTypes.object,
      labelClass: PropTypes.string,
      showLabel: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      className: '',
      fill: '#333',
      opacity: 1,
      stroke: '#FFF',
      strokeWidth: 1.5,
    };
  }

  render() {
    const {
      node, className, r,
      /* eslint-disable no-unused-vars */
      labelStyle, labelClass, showLabel,
      /* eslint-enable no-unused-vars */
      ...spreadable
    } = this.props;

    const { radius = 5 } = node;

    return (
      <circle
        className={`rv-force__node ${className}`}
        r={r || radius}
        {...spreadable}
      />
    );
  }
}
