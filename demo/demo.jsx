import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash.range';
import CalendarHeatmap from '../src';
import { shiftDate } from '../src/dateHelpers';

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

function customTitleForValue(value) {
  return value ? JSON.stringify(value) : null;
}

const randomValues = generateRandomValues(200);
const halfYearAgo = shiftDate(new Date(), -180);
const pastRandomValues = generateRandomValues(200, halfYearAgo);

const DemoItem = (props) => (
  <div className="row m-b-3">
    <div className="col-md-6">
      {props.children}
    </div>
    <div className="col-md-6">
      <p>{props.description}</p>
      <small><a href="https://github.com/patientslikeme/react-calendar-heatmap/blob/master/demo/demo.jsx">See demo.jsx</a></small>
    </div>
  </div>
);

class AsyncDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        values: this.state.values.length > 0 ? [] : randomValues,
      });
    }, 1500);
  }

  render()  {
    return (
      <CalendarHeatmap
        values={this.state.values}
      />
    );
  }
}

class Demo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row m-y-3">
          <div className="text-md-center">
            <h1><a href="https://github.com/patientslikeme/react-calendar-heatmap">{COMPONENT_NAME}</a></h1>
            <p>{COMPONENT_DESCRIPTION} <small>v{COMPONENT_VERSION}</small></p>
          </div>
        </div>

        <DemoItem
          description="Default configuration with custom color scheme, tooltips, and randomly generated data"
        >
          <CalendarHeatmap
            values={randomValues}
            classForValue={customClassForValue}
            titleForValue={customTitleForValue}
          />
        </DemoItem>

        <DemoItem
          description="Shorter or longer time spans"
        >
          <div className="row">
            <div className="col-md-4">
              <CalendarHeatmap
                numDays={60}
                values={randomValues}
              />
            </div>
            <div className="col-md-8">
              <CalendarHeatmap
                numDays={400}
                values={randomValues}
              />
            </div>
          </div>
        </DemoItem>

        <DemoItem
          description="Display days that are out of date range"
        >
          <CalendarHeatmap
            values={randomValues}
            showOutOfRangeDays={true}
          />
        </DemoItem>

        <DemoItem
          description="Adjusting date window"
        >
          <CalendarHeatmap
            endDate={halfYearAgo}
            values={pastRandomValues}
          />
        </DemoItem>

        <DemoItem
          description="Use millisecond timestamps or parseable strings for date attribute"
        >
          <CalendarHeatmap
            endDate={new Date(2016, 3, 1)}
            values={[
              { date: '2016-01-01' },
              { date: (new Date('2016-02-02')).getTime() },
            ]}
          />
        </DemoItem>

        <DemoItem
          description="Removing month labels"
        >
          <CalendarHeatmap
            values={randomValues}
            showMonthLabels={false}
          />
        </DemoItem>

        <DemoItem
          description="Setting an onClick callback"
        >
          <CalendarHeatmap
            values={randomValues}
            classForValue={customClassForValue}
            onClick={(value) => alert(`Clicked on ${value.date} with value ${value.count}`)}
          />
        </DemoItem>

        <DemoItem
          description="Loading values asynchronously"
        >
          <AsyncDemo />
        </DemoItem>

        <DemoItem
          description="Vertical orientation, e.g. for showing a traditional calendar view"
        >
          <div className="row">
            <div className="col-md-4">
              <CalendarHeatmap
                values={randomValues}
                numDays={150}
                horizontal={false}
                classForValue={customClassForValue}
              />
            </div>
            <div className="col-md-4">
              <CalendarHeatmap
                values={randomValues}
                numDays={31}
                horizontal={false}
                showMonthLabels={false}
                classForValue={customClassForValue}
              />
            </div>
          </div>
        </DemoItem>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
