import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash.range';
import CalendarHeatmap from '../src';
import shiftDate from '../src/shiftDate';

const today = new Date();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = today) {
  return range(count).map((index) => {
    return {
      date: shiftDate(date, -index),
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

const randomValues = generateRandomValues(200);
const halfYearAgo = shiftDate(new Date(), -180);
const pastRandomValues = generateRandomValues(200, halfYearAgo);

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        values: generateRandomValues(200),
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <p>No data points</p>
        <CalendarHeatmap values={[]} />

        <p>Default configuration with custom color scheme and randomly generated data</p>
        <CalendarHeatmap
          values={randomValues}
          classForValue={customClassForValue}
        />

        <p>Display days that are out of date range</p>
        <CalendarHeatmap
          values={randomValues}
          classForValue={customClassForValue}
          showOutOfRangeDays={true}
        />

        <p>Setting an end date in the past</p>
        <CalendarHeatmap
          endDate={halfYearAgo}
          values={pastRandomValues}
          classForValue={customClassForValue}
        />

        <p>Use millisecond timestamps or parseable strings for date attribute</p>
        <CalendarHeatmap
          endDate={new Date(2016, 3, 1)}
          values={[
            { date: '2016-01-01' },
            { date: (new Date('2016-02-02')).getTime() },
          ]}
        />

        <p>Loading values asynchronously</p>
        <CalendarHeatmap
          values={this.state.values}
        />

        <p>No month labels</p>
        <CalendarHeatmap
          values={randomValues}
          classForValue={customClassForValue}
          showMonthLabels={false}
        />

        <p>Custom click handler</p>
        <CalendarHeatmap
          values={randomValues}
          classForValue={customClassForValue}
          onClick={(value) => alert(`Clicked on ${value.date} with value ${value.count}`)}
        />

        <p>Shorter time span</p>
        <CalendarHeatmap
          numDays={60}
          values={randomValues}
          classForValue={customClassForValue}
        />
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
