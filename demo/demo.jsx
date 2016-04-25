import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash.range';
import CalendarHeatmap from '../src';
import { MILLISECONDS_IN_ONE_DAY } from '../src/constants';

const todayMilliseconds = (new Date()).getTime();
const halfYearAgoMilliseconds = todayMilliseconds - 180 * MILLISECONDS_IN_ONE_DAY;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, time = todayMilliseconds) {
  return range(count).map((index) => {
    const date = new Date(time - index * MILLISECONDS_IN_ONE_DAY);
    return {
      date: date,
      count: getRandomInt(0, 22),
    };
  })
}

const Demo = () => (
  <div>
    <p>No data points</p>
    <CalendarHeatmap values={[]} />

    <p>Default configuration with randomly generated data</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
    />

    <p>Shorter time span</p>
    <CalendarHeatmap
      numDays={60}
      values={generateRandomValues(60)}
    />

    <p>Setting an end date in the past</p>
    <CalendarHeatmap
      endDate={new Date(halfYearAgoMilliseconds)}
      values={generateRandomValues(200, halfYearAgoMilliseconds)}
    />

    <p>No month labels</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
      showMonthLabels={false}
    />

    <p>Custom click handler</p>
    <CalendarHeatmap
      values={generateRandomValues(200)}
      onClick={(value) => alert(`Clicked on ${value.date} with value ${value.count}`)}
    />
  </div>
);

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
