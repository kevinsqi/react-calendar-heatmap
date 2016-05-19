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
  return value ? `You're hovering over ${value.date} with value ${value.count}` : null;
}

function customOnClick(value) {
  if (value) {
    alert(`Clicked on ${value.date} with value ${value.count}`);
  }
}

const randomValues = generateRandomValues(200);
const halfYearAgo = shiftDate(new Date(), -180);
const pastRandomValues = generateRandomValues(200, halfYearAgo);

const githubURL = "https://github.com/patientslikeme/react-calendar-heatmap";
const githubDemoFileURL = "https://github.com/patientslikeme/react-calendar-heatmap/blob/master/demo/demo.jsx";

const DemoItem = (props) => (
  <div className="row m-b-3">
    <div className="col-md-4">
      {props.children}
    </div>
    <div className="col-md-8">
      <p><code>{props.name}</code></p>
      <p>{props.description}</p>
      <small><a href={githubDemoFileURL}>See configuration</a></small>
    </div>
  </div>
);

class Demo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row m-y-3">
          <div className="text-md-center">
            <h1 className="m-b-2"><a href="https://github.com/patientslikeme/react-calendar-heatmap">{COMPONENT_NAME}</a></h1>
            <p>{COMPONENT_DESCRIPTION} <span className="text-muted">v{COMPONENT_VERSION}</span></p>
            <p><code>npm install {COMPONENT_NAME}</code></p>
          </div>
        </div>

        <div className="row m-b-3">
          <div className="col-md-6 offset-md-3">
            <CalendarHeatmap
              values={randomValues}
              classForValue={customClassForValue}
              titleForValue={customTitleForValue}
              onClick={customOnClick}
            />
          </div>
        </div>

        <hr />
        <h2 className="text-md-center m-y-3">Configuration</h2>

        <DemoItem
          name="values"
          description="Required array of objects which each have a date property, which can be a Date object, millisecond timestamps, or parseable strings"
        >
          <CalendarHeatmap
            endDate={new Date(2016, 3, 1)}
            values={[
              { date: '2016-01-01' },
              { date: (new Date('2016-01-02')).getTime() },
              { date: new Date('2016-01-03') },
            ]}
          />
        </DemoItem>

        <DemoItem
          name="numDays"
          description="Set time span in days"
        >
          <CalendarHeatmap
            numDays={400}
            values={randomValues}
          />
        </DemoItem>

        <DemoItem
          name="endDate"
          description="Set end of date range"
        >
          <CalendarHeatmap
            endDate={halfYearAgo}
            values={pastRandomValues}
          />
        </DemoItem>

        <DemoItem
          name="showMonthLabels"
          description="Toggle for removing month labels"
        >
          <CalendarHeatmap
            values={randomValues}
            showMonthLabels={false}
          />
        </DemoItem>

        <DemoItem
          name="showOutOfRangeDays"
          description="Toggle extra days in week that are past endDate and before beginning of range"
        >
          <CalendarHeatmap
            values={randomValues}
            showOutOfRangeDays={true}
          />
        </DemoItem>

        <DemoItem
          name="horizontal"
          description="Whether to orient horizontally or vertically. Can be used in combination with numDays/endDate to show just the current month"
        >
          <div className="row">
            <div className="col-xs-4">
              <CalendarHeatmap
                values={randomValues}
                numDays={100}
                horizontal={false}
              />
            </div>
            <div className="col-xs-4">
              <CalendarHeatmap
                values={randomValues}
                numDays={31}
                horizontal={false}
                showMonthLabels={false}
              />
            </div>
          </div>
        </DemoItem>

        <DemoItem
          name="gutterSize"
          description="Increase or decrease gutter size"
        >
          <CalendarHeatmap
            values={randomValues}
            gutterSize={2}
          />
        </DemoItem>

        <DemoItem
          name="onClick"
          description="Callback to invoke when a square is clicked"
        >
          <CalendarHeatmap
            values={randomValues}
            onClick={customOnClick}
          />
        </DemoItem>

        <DemoItem
          name="titleForValue"
          description="Callback for determining hover tooltip of each value"
        >
          <CalendarHeatmap
            values={randomValues}
            titleForValue={customTitleForValue}
          />
        </DemoItem>

        <DemoItem
          name="classForValue"
          description="Callback for determining CSS class to apply to each value"
        >
          <CalendarHeatmap
            values={randomValues}
            classForValue={customClassForValue}
          />
        </DemoItem>

        <hr />
        <div className="text-xs-center m-y-3">
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
