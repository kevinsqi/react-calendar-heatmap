import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CalendarHeatmap from './index';
import { dateNDaysAgo, shiftDate } from './helpers';

Enzyme.configure({ adapter: new Adapter() });

const getWrapper = (overrideProps, renderMethod = 'shallow') => {
  const defaultProps = {
    values: [],
  };
  return Enzyme[renderMethod](<CalendarHeatmap {...defaultProps} {...overrideProps} />);
};

describe('CalendarHeatmap', () => {
  const values = [
    { date: new Date('2017-06-01') },
    { date: new Date('2017-06-02') },
    { date: new Date('2018-06-01') },
    { date: new Date('2018-06-02') },
    { date: new Date('2018-06-03') },
  ];

  it('should render as an svg', () => {
    const wrapper = shallow(<CalendarHeatmap values={[]} />);

    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should not throw exceptions in base case', () => {
    expect(() => <CalendarHeatmap values={[]} />).not.toThrow();
  });

  it('shows values within its original date range', () => {
    const wrapper = shallow(
      <CalendarHeatmap
        endDate={new Date('2017-12-31')}
        startDate={new Date('2017-01-01')}
        values={values}
      />,
    );

    expect(wrapper.find('.color-filled').length).toBe(2);
  });

  it('should handle string formatted date range', () => {
    const wrapper = shallow(
      <CalendarHeatmap endDate="2017-12-31" startDate="2017-01-01" values={values} />,
    );

    expect(wrapper.find('.color-filled').length).toBe(2);
  });

  it('shows values within an updated date range', () => {
    const wrapper = shallow(
      <CalendarHeatmap
        endDate={new Date('2017-12-31')}
        startDate={new Date('2017-01-01')}
        values={values}
      />,
    );

    wrapper.setProps({
      endDate: new Date('2018-12-31'),
      startDate: new Date('2018-01-01'),
    });

    expect(wrapper.find('.color-filled').length).toBe(3);
  });

  it('shows values that are the start and end dates', () => {
    const wrapper = shallow(
      <CalendarHeatmap
        startDate={new Date('2017-06-01')}
        endDate={new Date('2017-06-02')}
        values={values}
      />,
    );

    expect(wrapper.find('.color-filled').length).toBe(2);
  });

  it('doesnt show values outside the date range', () => {
    const wrapper = shallow(
      <CalendarHeatmap
        startDate={new Date('2018-06-02')}
        endDate={new Date('2018-06-02')}
        values={values}
      />,
    );

    expect(wrapper.find('.color-filled').length).toBe(1);
  });
});

describe('CalendarHeatmap props', () => {
  it('values', () => {
    const values = [
      { date: '2016-01-01' },
      { date: new Date('2016-01-02').getTime() },
      { date: new Date('2016-01-03') },
    ];
    const wrapper = shallow(
      <CalendarHeatmap
        endDate={new Date('2016-02-01')}
        startDate={new Date('2015-12-20')}
        values={values}
      />,
    );

    // 'values should handle Date/string/number formats'
    expect(wrapper.find('.color-filled')).toHaveLength(values.length);
  });

  it('horizontal', () => {
    const horizontal = shallow(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} horizontal />,
    );
    const [, , horWidth, horHeight] = horizontal.prop('viewBox').split(' ');
    // 'horizontal orientation width should be greater than height'
    expect(Number(horWidth)).toBeGreaterThan(Number(horHeight));

    const vertical = shallow(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} horizontal={false} />,
    );
    const [, , vertWidth, vertHeight] = vertical.prop('viewBox').split(' ');
    // 'vertical orientation width should be less than height'
    expect(Number(vertWidth)).toBeLessThan(Number(vertHeight));
  });

  it('startDate', () => {
    const today = new Date();
    const wrapper = shallow(<CalendarHeatmap values={[]} endDate={today} startDate={today} />);

    expect(
      today.getDate() ===
        wrapper
          .instance()
          .getStartDate()
          .getDate() &&
      today.getMonth() ===
        wrapper
          .instance()
          .getStartDate()
          .getMonth(),
    ).toBe(true);
  });

  it('endDate', () => {
    const today = new Date();
    const wrapper = shallow(
      <CalendarHeatmap values={[]} endDate={today} startDate={dateNDaysAgo(10)} />,
    );

    expect(
      today.getDate() ===
        wrapper
          .instance()
          .getEndDate()
          .getDate() &&
      today.getMonth() ===
        wrapper
          .instance()
          .getEndDate()
          .getMonth(),
    ).toBe(true);
  });

  it('classForValue', () => {
    const today = new Date();
    const numDays = 10;
    const expectedStartDate = shiftDate(today, -numDays + 1);
    const wrapper = shallow(
      <CalendarHeatmap
        values={[{ date: expectedStartDate, count: 0 }, { date: today, count: 1 }]}
        endDate={today}
        startDate={dateNDaysAgo(numDays)}
        titleForValue={(value) => (value ? value.count : null)}
        classForValue={(value) => {
          if (!value) {
            return null;
          }
          return value.count > 0 ? 'red' : 'white';
        }}
      />,
    );

    expect(wrapper.find('.white')).toHaveLength(1);
    expect(wrapper.find('.red')).toHaveLength(1);

    // TODO these attr selectors might be broken with react 15
    // assert(wrapper.first('rect[title=0]').hasClass('white'));
    // assert(wrapper.first('rect[title=1]').hasClass('red'));
  });

  it('showMonthLabels', () => {
    const visible = shallow(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} showMonthLabels />,
    );

    expect(visible.find('text').length).toBeGreaterThan(0);

    const hidden = shallow(<CalendarHeatmap values={[]} showMonthLabels={false} />);

    expect(hidden.find('text')).toHaveLength(0);
  });

  it('showWeekdayLabels', () => {
    const visible = shallow(
      <CalendarHeatmap startDate={dateNDaysAgo(7)} values={[]} showWeekdayLabels />,
    );

    expect(visible.find('text').length).toBeGreaterThan(2);

    const hidden = shallow(
      <CalendarHeatmap values={[]} showMonthLabels={false} showWeekdayLabels={false} />,
    );

    expect(hidden.find('text')).toHaveLength(0);

    // should display text with .small-text class
    // in case if horizontal prop value is false
    const vertical = shallow(<CalendarHeatmap values={[]} horizontal={false} showWeekdayLabels />);

    expect(vertical.find('text.react-calendar-heatmap-small-text')).toHaveLength(3);
  });

  it('transformDayElement', () => {
    const transform = (rect) => React.cloneElement(rect, { 'data-test': 'ok' });
    const today = new Date();
    const expectedStartDate = shiftDate(today, -1);
    const wrapper = shallow(
      <CalendarHeatmap
        values={[{ date: today }, { date: expectedStartDate }]}
        endDate={today}
        startDate={expectedStartDate}
        transformDayElement={transform}
      />,
    );

    expect(wrapper.find('[data-test="ok"]')).toHaveLength(2);
  });

  describe('tooltipDataAttrs', () => {
    it('allows a function to be passed', () => {
      const today = new Date();
      const numDays = 10;
      const expectedStartDate = shiftDate(today, -numDays + 1);
      const wrapper = shallow(
        <CalendarHeatmap
          values={[{ date: today, count: 1 }, { date: expectedStartDate, count: 0 }]}
          endDate={today}
          startDate={expectedStartDate}
          tooltipDataAttrs={({ count }) => ({
            'data-tooltip': `Count: ${count}`,
          })}
        />,
      );

      expect(wrapper.find('[data-tooltip="Count: 1"]')).toHaveLength(1);
    });
  });

  describe('event handlers', () => {
    const count = 999;
    const startDate = '2018-06-01';
    const endDate = '2018-06-03';
    const values = [{ date: '2018-06-01', count }];
    const props = {
      values,
      startDate,
      endDate,
    };
    const expectedValue = values[0];

    it('calls props.onClick with the correct value', () => {
      const onClick = jest.fn();
      const wrapper = getWrapper({ ...props, onClick });

      const rect = wrapper.find('rect').at(0);
      rect.simulate('click');

      expect(onClick).toHaveBeenCalledWith(expectedValue);
    });

    it('calls props.onMouseOver with the correct value', () => {
      const onMouseOver = jest.fn();
      const wrapper = getWrapper({ ...props, onMouseOver });
      const fakeEvent = { preventDefault: jest.fn() };

      const rect = wrapper.find('rect').at(0);
      rect.simulate('mouseOver', fakeEvent);

      expect(onMouseOver).toHaveBeenCalledWith(fakeEvent, expectedValue);
    });

    it('calls props.onMouseLeave with the correct value', () => {
      const onMouseLeave = jest.fn();
      const wrapper = getWrapper({ ...props, onMouseLeave });
      const fakeEvent = { preventDefault: jest.fn() };

      const rect = wrapper.find('rect').at(0);
      rect.simulate('mouseLeave', fakeEvent);

      expect(onMouseLeave).toHaveBeenCalledWith(fakeEvent, expectedValue);
    });
  });
});
