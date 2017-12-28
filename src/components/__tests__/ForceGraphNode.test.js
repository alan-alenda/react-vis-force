import React from 'react';
import { shallow } from 'enzyme';

import ForceGraphNode from '../ForceGraphNode';

const defaultProps = {
  node: {
    id: 'a',
    radius: 5,
  },
};


describe('<ForceGraphNode />', () => {
  it('should render a circle', () => {
    const wrapper = shallow(<ForceGraphNode {...defaultProps} />);

    expect(wrapper.matchesElement(<circle />)).toEqual(true);
  });

  it('should use the radius off the node', () => {
    const wrapper = shallow(
      <ForceGraphNode {...defaultProps} node={{ ...defaultProps.node, radius: 10 }} />
    );

    expect(wrapper.find('circle').first().prop('r')).toEqual(10);
  });

  it('should use a provided r', () => {
    const wrapper = shallow(
      <ForceGraphNode {...defaultProps} r={4} node={{ ...defaultProps.node, radius: 10 }} />
    );

    expect(wrapper.find('circle').first().prop('r')).toEqual(4);
  });

  it('should apply a className', () => {
    const wrapper = shallow(<ForceGraphNode {...defaultProps} className={'my-class'} />);

    expect(wrapper.find('circle').first().prop('className')).toEqual('rv-force__node my-class');
  });

  it('should strip label props off', () => {
    const wrapper = shallow(<ForceGraphNode {...defaultProps} />);

    expect(wrapper.find('circle').first().prop('labelStyle')).toBeUndefined();
    expect(wrapper.find('circle').first().prop('labelClass')).toBeUndefined();
    expect(wrapper.find('circle').first().prop('showLabel')).toBeUndefined();
  });

  it('should spread the rest of the props over the line', () => {
    const wrapper = shallow(<ForceGraphNode {...defaultProps} cx={50} cy={70} />);

    expect(wrapper.find('circle').first().prop('cx')).toEqual(50);
    expect(wrapper.find('circle').first().prop('cy')).toEqual(70);
  });
});
