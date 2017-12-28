
import React from 'react';
import { shallow } from 'enzyme';

import ForceGraphLink from '../ForceGraphLink';

const defaultProps = {
  link: {
    source: 'a',
    target: 'b',
    value: 5,
  },
};

describe('<ForceGraphLink />', () => {
  it('should render a line', () => {
    const wrapper = shallow(<ForceGraphLink {...defaultProps} />);

    expect(wrapper.matchesElement(<line />)).toEqual(true);
  });

  it('should calculate a strokeWidth for the value', () => {
    const wrapper = shallow(
      <ForceGraphLink
        {...defaultProps}
        link={{ ...defaultProps.link, value: 9 }}
      />
    );

    expect(wrapper.find('line').first().prop('strokeWidth')).toEqual(3);
  });

  it('should use a provided strokeWidth', () => {
    const wrapper = shallow(
      <ForceGraphLink
        {...defaultProps}
        strokeWidth={4}
        link={{ ...defaultProps.link, value: 9 }}
      />
    );

    expect(wrapper.find('line').first().prop('strokeWidth')).toEqual(4);
  });

  it('should apply a className', () => {
    const wrapper = shallow(
      <ForceGraphLink
        {...defaultProps}
        className={'my-class'}
      />
    );

    expect(wrapper.find('line').first().prop('className')).toEqual('rv-force__link my-class');
  });

  it('should spread the rest of the props over the line', () => {
    const wrapper = shallow(
      <ForceGraphLink
        {...defaultProps}
        x1={50}
        x2={70}
        y1={100}
        y2={0}
      />
    );

    expect(wrapper.find('line').first().prop('x1')).toEqual(50);
    expect(wrapper.find('line').first().prop('x2')).toEqual(70);
    expect(wrapper.find('line').first().prop('y1')).toEqual(100);
    expect(wrapper.find('line').first().prop('y2')).toEqual(0);
  });
});
