import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash.range';
import CalendarHeatmap from '../src';
import { MILLISECONDS_IN_ONE_DAY } from '../src/constants';

const todayTime = (new Date()).getTime();
const halfYearAgoTime = todayTime - 180 * MILLISECONDS_IN_ONE_DAY;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, time = todayTime) {
  return range(count).map((index) => {
    const date = new Date(time - index * MILLISECONDS_IN_ONE_DAY);
    return {
      date: date,
      count: getRandomInt(1, 3),
    };
  })
}

function customClassForValue(value) {
  if (!value) {
    return 'color-empty';
  }
  return {
    1: 'color-small',
    2: 'color-medium',
    3: 'color-large',
    4: 'color-huge',
  }[value.count];
}

const Demo = () => (
  <div>
    <p>No data points</p>
    <CalendarHeatmap values={[]} />

    <p>Default configuration with custom color scheme and randomly generated data</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
      classForValue={customClassForValue}
    />

    <p>Display days that are out of date range</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
      classForValue={customClassForValue}
      showOutOfRangeDays={true}
    />

    <p>Setting an end date in the past</p>
    <CalendarHeatmap
      endDate={new Date(halfYearAgoTime)}
      values={generateRandomValues(200, halfYearAgoTime)}
      classForValue={customClassForValue}
    />

    <p>No month labels</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
      classForValue={customClassForValue}
      showMonthLabels={false}
    />

    <p>Custom click handler</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
      classForValue={customClassForValue}
      onClick={(value) => alert(`Clicked on ${value.date} with value ${value.count}`)}
    />

    <p>Shorter time span</p>
    <CalendarHeatmap
      numDays={60}
      values={generateRandomValues(60)}
      classForValue={customClassForValue}
    />
  </div>
);

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
