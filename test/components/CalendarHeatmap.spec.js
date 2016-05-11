import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import CalendarHeatmap from '../../src';

describe('CalendarHeatmap', () => {
  it('should render as an svg', () => {
    const wrapper = shallow(<CalendarHeatmap values={[]} />);
    assert.equal(1, wrapper.find('svg').length);
  });

  it('should not throw exceptions in base case', () => {
    assert.doesNotThrow(() => <CalendarHeatmap values={[]} />);
  });

  it.skip('should start on the correct day', () => {

  });

  it.skip('should end on the correct day', () => {

  });
});
