import React from 'react';
import { prettyDOM, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalendarHeatmap from './index';
import { dateNDaysAgo, startOfDay, getISODate, shiftDate } from './helpers';

describe('CalendarHeatmap', () => {
  const values = [
    { date: new Date('2017-06-01') },
    { date: new Date('2017-06-02') },
    { date: new Date('2018-06-01') },
    { date: new Date('2018-06-02') },
    { date: new Date('2018-06-03') },
  ];

  it('should render as an svg', () => {
    const { container } = render(<CalendarHeatmap values={[]} />);

    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('should not throw exceptions in base case', () => {
    expect(() => <CalendarHeatmap values={[]} />).not.toThrow();
  });

  it('shows values within its original date range', () => {
    const { container } = render(
      <CalendarHeatmap
        endDate={new Date('2017-12-31')}
        startDate={new Date('2017-01-01')}
        values={values}
      />,
    );

    expect(container.querySelectorAll('.color-filled').length).toBe(2);
  });

  it('should handle string formatted date range', () => {
    const { container } = render(
      <CalendarHeatmap endDate="2017-12-31" startDate="2017-01-01" values={values} />,
    );

    expect(container.querySelectorAll('.color-filled').length).toBe(2);
  });

  it('shows values within an updated date range', () => {
    const { container, rerender } = render(
      <CalendarHeatmap
        endDate={new Date('2017-12-31')}
        startDate={new Date('2017-01-01')}
        values={values}
      />,
    );

    rerender(
      <CalendarHeatmap
        endDate={new Date('2018-12-31')}
        startDate={new Date('2018-01-01')}
        values={values}
      />,
    );

    expect(container.querySelectorAll('.color-filled').length).toBe(3);
  });
});

describe('CalendarHeatmap props', () => {
  it('values', () => {
    const values = [
      { date: '2016-01-01' },
      { date: new Date('2016-01-02').getTime() },
      { date: new Date('2016-01-03') },
    ];
    const { container } = render(
      <CalendarHeatmap
        endDate={new Date('2016-02-01')}
        startDate={new Date('2015-12-20')}
        values={values}
      />,
    );

    // 'values should handle Date/string/number formats'
    expect(container.querySelectorAll('.color-filled')).toHaveLength(values.length);
  });

  it('horizontal', () => {
    const { rerender, container } = render(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} horizontal />,
    );
    let viewBox = container.querySelector('svg').getAttribute('viewBox');

    const [, , horWidth, horHeight] = viewBox.split(' ');
    // 'horizontal orientation width should be greater than height'
    expect(Number(horWidth)).toBeGreaterThan(Number(horHeight));

    rerender(<CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} horizontal={false} />);

    viewBox = container.querySelector('svg').getAttribute('viewBox');
    const [, , vertWidth, vertHeight] = viewBox.split(' ');
    // 'vertical orientation width should be less than height'
    expect(Number(vertWidth)).toBeLessThan(Number(vertHeight));
  });

  it('titleForValue', () => {
    const startDate = new Date('2022-10-15');
    const endDate = shiftDate(startDate, 1);

    const { container } = render(
      <CalendarHeatmap
        values={[
          { date: startDate, count: 0 },
          { date: endDate, count: 99 },
        ]}
        startDate={startDate}
        endDate={endDate}
        titleForValue={(value) => (value ? `${getISODate(value.date)}` : undefined)}
      />,
    );

    const rects = container.querySelectorAll('rect');
    expect(rects).toHaveLength(2);
    expect(rects[0].textContent).toBe(getISODate(startDate));
    expect(rects[1].textContent).toBe(getISODate(endDate));
  });

  it('classForValue', () => {
    const today = new Date();
    const numDays = 10;
    const expectedStartDate = shiftDate(today, -numDays + 1);
    const { container } = render(
      <CalendarHeatmap
        values={[
          { date: expectedStartDate, count: 0 },
          { date: today, count: 1 },
        ]}
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

    expect(container.querySelectorAll('.white')).toHaveLength(1);
    expect(container.querySelectorAll('.red')).toHaveLength(1);
  });

  it('showMonthLabels', () => {
    const { container, rerender } = render(
      <CalendarHeatmap startDate={dateNDaysAgo(100)} values={[]} showMonthLabels />,
    );

    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);

    rerender(<CalendarHeatmap values={[]} showMonthLabels={false} />);

    expect(container.querySelectorAll('text')).toHaveLength(0);
  });

  it('showWeekdayLabels', () => {
    const { container, rerender } = render(
      <CalendarHeatmap startDate={dateNDaysAgo(7)} values={[]} showWeekdayLabels />,
    );

    expect(container.querySelectorAll('text').length).toBeGreaterThan(2);

    rerender(<CalendarHeatmap values={[]} showMonthLabels={false} showWeekdayLabels={false} />);

    expect(container.querySelectorAll('text')).toHaveLength(0);

    // should display text with .small-text class
    // in case if horizontal prop value is false
    rerender(<CalendarHeatmap values={[]} horizontal={false} showWeekdayLabels />);

    expect(container.querySelectorAll('text.react-calendar-heatmap-small-text')).toHaveLength(3);
  });

  it('transformDayElement', () => {
    const transform = (rect) => React.cloneElement(rect, { 'data-test': 'ok' });
    const startDate = new Date();
    const endDate = shiftDate(startDate, 1);
    const { container } = render(
      <CalendarHeatmap
        values={[]}
        startDate={startDate}
        endDate={endDate}
        transformDayElement={transform}
      />,
    );

    expect(container.querySelectorAll('[data-test="ok"]')).toHaveLength(2);
  });

  it('should start at startDate and end at endDate', () => {
    const startDate = startOfDay(new Date('2022-11-01'));
    const endDate = new Date('2022-11-30');

    const { container } = render(
      <CalendarHeatmap
        values={[{ date: startDate }, { date: endDate }]}
        endDate={endDate}
        startDate={startDate}
        titleForValue={(value) => (value ? getISODate(value.date) : undefined)}
      />,
    );
    const rects = container.querySelectorAll('rect');

    expect(rects).toHaveLength(30);
    expect(rects[0].textContent).toBe(getISODate(startDate));
    expect(rects[rects.length - 1].textContent).toBe(getISODate(endDate));
  });

  it('should start at startDate and end at endDate', () => {
    const startDate = startOfDay(new Date('2022-10-01'));
    const endDate = new Date('2022-10-31');

    const { container } = render(
      <CalendarHeatmap
        values={[{ date: startDate }, { date: endDate }]}
        endDate={endDate}
        startDate={startDate}
        titleForValue={(value) => (value ? getISODate(value.date) : undefined)}
      />,
    );
    const rects = container.querySelectorAll('rect');

    expect(rects).toHaveLength(31);
    expect(rects[0].textContent).toBe(getISODate(startDate));
    expect(rects[rects.length - 1].textContent).toBe(getISODate(endDate));
  });

  describe('tooltipDataAttrs', () => {
    it('allows a function to be passed', () => {
      const today = new Date();
      const numDays = 10;
      const expectedStartDate = shiftDate(today, -numDays + 1);
      const { container } = render(
        <CalendarHeatmap
          values={[
            { date: today, count: 1 },
            { date: expectedStartDate, count: 0 },
          ]}
          endDate={today}
          startDate={expectedStartDate}
          tooltipDataAttrs={({ count }) => ({
            'data-tooltip': `Count: ${count}`,
          })}
        />,
      );

      expect(container.querySelectorAll('[data-tooltip="Count: 1"]')).toHaveLength(1);
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

    it('calls props.onClick with the correct value', async () => {
      const user = userEvent.setup();

      const onClick = jest.fn();
      const { container } = render(<CalendarHeatmap {...props} onClick={onClick} />);
      const rect = container.querySelector('rect');
      await user.click(rect);

      expect(onClick).toHaveBeenCalledWith(expectedValue);
    });

    it('calls props.onMouseOver with the correct value', async () => {
      const user = userEvent.setup();

      const onMouseOver = jest.fn();
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      const { container } = render(<CalendarHeatmap {...props} onMouseOver={onMouseOver} />);

      const rect = container.querySelector('rect');
      await user.hover(rect);

      expect(onMouseOver).toHaveBeenCalledWith(expect.any(Object), expectedValue);
    });

    it('calls props.onMouseLeave with the correct value', async () => {
      const user = userEvent.setup();

      const onMouseLeave = jest.fn();
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      const { container } = render(<CalendarHeatmap {...props} onMouseLeave={onMouseLeave} />);

      const rect = container.querySelector('rect');
      await user.hover(rect);
      await user.unhover(rect);

      expect(onMouseLeave).toHaveBeenCalledWith(expect.any(Object), expectedValue);
    });
  });
});
