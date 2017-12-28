import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import linkPropTypes from '../propTypes/link';
import { linkId } from '../utils/d3-force';
import ForceGraphLink from './ForceGraphLink';

export default class ForceGraphArrowLink extends PureComponent {
  static get propTypes() {
    return {
      link: linkPropTypes.isRequired,
      targetRadius: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      className: '',
      opacity: 0.6,
      stroke: '#999',
      targetRadius: 25,
      strokeWidth: 1,
    };
  }

  render() {
    const { link, targetRadius, ...spreadable } = this.props;
    const id = `arrow-${linkId(link)}`;

    return (
      <g>
        <defs>
          <marker
            id={id}
            markerWidth={(targetRadius * 3) + 1}
            markerHeight={(targetRadius * 3) + 1}
            refX={(targetRadius * 3) + 1}
            refY={targetRadius}
            orient="auto"
            markerUnits="strokeWidth"
          >
            {targetRadius > 0 && (
              <path
                d={`M0,0 L0,${targetRadius * 2} L${targetRadius * 3},${targetRadius} z`}
                fill={spreadable.stroke || spreadable.color}
              />
            )}
          </marker>
        </defs>

        <ForceGraphLink {...spreadable} link={link} edgeOffset={targetRadius} markerEnd={`url(#${id})`} />
      </g>
    );
  }
}
