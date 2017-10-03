import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import CalendarHeatmap from '../../src';
import {dateNDaysAgo, shiftDate} from '../../src/dateHelpers';


describe('CalendarHeatmap', () => {
  it('should render as an svg', () => {
    const wrapper = shallow(
      <CalendarHeatmap values={[]}/>
    );
    assert.equal(1, wrapper.find('svg').length);
  });

  it('should not throw exceptions in base case', () => {
    assert.doesNotThrow(() => <CalendarHeatmap values={[]}/>);
  });
});

describe('CalendarHeatmap props', () => {
  it('values', () => {
    const values = [
      {date: '2016-01-01'},
      {date: (new Date('2016-01-02')).getTime()},
      {date: new Date('2016-01-03')},
    ];
    const wrapper = shallow(
      <CalendarHeatmap
        endDate={new Date('2016-02-01')}
        startDate={new Date('2015-12-20')}
        values={values}
      />
    );

    assert.equal(values.length, wrapper.find('.color-filled').length, 'values should handle Date/string/number formats');
  });

  it('horizontal', () => {
    const horizontal = shallow(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} horizontal/>
    );
    const [, , horWidth, horHeight] = horizontal.prop('viewBox').split(' ');
    assert(Number(horWidth) > Number(horHeight), 'horizontal orientation width should be greater than height');

    const vertical = shallow(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} horizontal={false}/>
    );
    const [, , vertWidth, vertHeight] = vertical.prop('viewBox').split(' ');
    assert(Number(vertWidth) < Number(vertHeight), 'vertical orientation width should be less than height');
  });

  it('startDate', () => {
    const today = new Date();
    const wrapper = shallow(
      <CalendarHeatmap values={[]} endDate={today} startDate={today}/>
    );

    assert(
      today.getDate() === wrapper.instance().getEndDate().getDate() &&
      today.getMonth() === wrapper.instance().getEndDate().getMonth()
    );
  });

  it('endDate', () => {
    const today = new Date();
    const wrapper = shallow(
      <CalendarHeatmap values={[]} endDate={today} startDate={dateNDaysAgo(10)}/>
    );

    assert(
      today.getDate() === wrapper.instance().getEndDate().getDate() &&
      today.getMonth() === wrapper.instance().getEndDate().getMonth()
    );
  });

  it('classForValue', () => {
    const today = new Date();
    const numDays = 10;
    const expectedStartDate = shiftDate(today, -numDays + 1);
    const wrapper = shallow(
      <CalendarHeatmap
        values={[
          {date: expectedStartDate, count: 0},
          {date: today, count: 1},
        ]}
        endDate={today}
        startDate={dateNDaysAgo(numDays)}
        titleForValue={value => (value ? value.count : null)}
        classForValue={(value) => {
          if (!value) {
            return null;
          }
          return value.count > 0 ? 'red' : 'white';
        }}
      />
    );

    assert.equal(1, wrapper.find('.white').length);
    assert.equal(1, wrapper.find('.red').length);

    // TODO these attr selectors might be broken with react 15
    // assert(wrapper.first('rect[title=0]').hasClass('white'));
    // assert(wrapper.first('rect[title=1]').hasClass('red'));
  });

  it('showMonthLabels', () => {
    const visible = shallow(
      <CalendarHeatmap
        startDate={dateNDaysAgo(100)}
        values={[]}
        showMonthLabels
      />
    );
    assert(visible.find('text').length > 0);

    const hidden = shallow(
      <CalendarHeatmap
        values={[]}
        showMonthLabels={false}
      />
    );
    assert.equal(0, hidden.find('text').length);
  });

  it('showWeekdayLabels', () => {
    const visible = shallow(
      <CalendarHeatmap
        startDate={dateNDaysAgo(7)}
        values={[]}
        showWeekdayLabels
      />
    );
    assert(visible.find('text').length > 2);

    const hidden = shallow(
      <CalendarHeatmap
        values={[]}
        showWeekdayLabels={false}
      />
    );
    assert.equal(7, hidden.find('text').length);

    // should display text with .small-text class
    // in case if horizontal prop value is false
    const vertical = shallow(
      <CalendarHeatmap
        values={[]}
        horizontal={false}
        showWeekdayLabels
      />
    );
    assert.equal(3, vertical.find('text.small-text').length);
  });

  it('transformDayElement', () => {
    const transform = rect => React.cloneElement(rect, {'data-test': 'ok'});
    const today = new Date();
    const expectedStartDate = shiftDate(today, -1);
    const wrapper = shallow(
      <CalendarHeatmap
        values={[
          {date: today},
          {date: expectedStartDate},
        ]}
        endDate={today}
        startDate={expectedStartDate}
        transformDayElement={transform}
      />
    );

    assert(wrapper.find('[data-test="ok"]').length === 1);
  });

  describe('tooltipDataAttrs', () => {
    it('allows a function to be passed', () => {
      const today = new Date();
      const numDays = 10;
      const expectedStartDate = shiftDate(today, -numDays + 1);
      const wrapper = shallow(
        <CalendarHeatmap
          values={[
            {date: today, count: 1},
            {date: expectedStartDate, count: 0},
          ]}
          endDate={today}
          startDate={expectedStartDate}
          tooltipDataAttrs={({count}) => ({
            'data-tooltip': `Count: ${count}`,
          })}
        />
      );

      assert(wrapper.find('[data-tooltip="Count: 1"]').length === 1);
    });
  });
});
