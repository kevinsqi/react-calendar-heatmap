import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import CalendarHeatmap from '../../src';

describe('CalendarHeatmap', () => {
  it('should render as an svg', () => {
    const wrapper = shallow(
      <CalendarHeatmap values={[]} />
    );
    assert.equal(1, wrapper.find('svg').length);
  });

  it('should not throw exceptions in base case', () => {
    assert.doesNotThrow(() => <CalendarHeatmap values={[]} />);
  });

  it('should be able to orient horizontally and vertically', () => {
    const horSVG = shallow(
      <CalendarHeatmap numDays={100} values={[]} horizontal={true} />
    ).find('svg');
    const [, , horWidth, horHeight] = horSVG.props().viewBox.split(' ');
    assert(Number(horWidth) > Number(horHeight), 'horizontal orientation width should be greater than height');

    const vertSVG = shallow(
      <CalendarHeatmap numDays={100} values={[]} horizontal={false} />
    ).find('svg');
    const [, , vertWidth, vertHeight] = vertSVG.props().viewBox.split(' ');
    assert(Number(vertWidth) < Number(vertHeight), 'vertical orientation width should be less than height');
  });

  it.skip('should start on the correct day', () => {

  });

  it.skip('should end on the correct day', () => {

  });
});
