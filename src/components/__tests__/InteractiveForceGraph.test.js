import React from 'react';
import { shallow } from 'enzyme';

import InteractiveForceGraph from '../InteractiveForceGraph';
import ForceGraph from '../ForceGraph';

describe('<InteractiveForceGraph />', () => {
  describe('render', () => {
    it('renders a <ForceGraph />', () => {
      const wrapper = shallow(<InteractiveForceGraph />);
      expect(wrapper.type()).toEqual(ForceGraph);
    });
  });

  describe('instance methods', () => {
    describe('onHoverNode', () => {});
    describe('onBlurNode', () => {});
    describe('onClickNode', () => {});
  });
});
