import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import CalendarHeatmap from '../../src';
import { shiftDate } from '../../src/dateHelpers';


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
    const horizontal = shallow(
      <CalendarHeatmap numDays={100} values={[]} horizontal />
    );
    const [, , horWidth, horHeight] = horizontal.props().viewBox.split(' ');
    assert(Number(horWidth) > Number(horHeight), 'horizontal orientation width should be greater than height');

    const vertical = shallow(
      <CalendarHeatmap numDays={100} values={[]} horizontal={false} />
    );
    const [, , vertWidth, vertHeight] = vertical.props().viewBox.split(' ');
    assert(Number(vertWidth) < Number(vertHeight), 'vertical orientation width should be less than height');
  });

  it('should end on the correct day', () => {
    const today = new Date();
    const wrapper = shallow(
      <CalendarHeatmap values={[]} endDate={today} numDays={10} />
    );

    assert.equal(today.getDate(), wrapper.instance().getEndDate().getDate());
    assert.equal(today.getMonth(), wrapper.instance().getEndDate().getMonth());
  });

  it('should start on the correct day', () => {
    const today = new Date();
    const numDays = 10;
    const expectedStartDate = shiftDate(today, -numDays + 1);
    const wrapper = shallow(
      <CalendarHeatmap values={[]} endDate={today} numDays={numDays} />
    );

    assert.equal(expectedStartDate.getDate(), wrapper.instance().getStartDate().getDate());
    assert.equal(expectedStartDate.getMonth(), wrapper.instance().getStartDate().getMonth());
  });
});
