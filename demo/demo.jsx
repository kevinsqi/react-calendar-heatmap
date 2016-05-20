import React from 'react';
import ReactDOM from 'react-dom';
import range from 'lodash.range';
import CalendarHeatmap from '../src';
import { shiftDate } from '../src/dateHelpers';

console.log(`react-calendar-heatmap v${COMPONENT_VERSION}`);

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

function githubClassForValue(value) {
  if (!value) {
    return 'color-empty';
  }
  return `color-github-${value.count}`;
}

function gitlabClassForValue(value) {
  if (!value) {
    return 'color-empty';
  }
  return `color-gitlab-${value.count}`;
}

function customTitleForValue(value) {
  return value ? `You're hovering over ${value.date.toDateString()} with value ${value.count}` : null;
}

function customOnClick(value) {
  if (value) {
    alert(`Clicked on ${value.date.toDateString()} with value ${value.count}`);
  }
}

const customTooltipDataAttrs = { 'data-toggle': 'tooltip' };
const randomValues = generateRandomValues(200);

const githubURL = "https://github.com/patientslikeme/react-calendar-heatmap";

const DemoItem = (props) => (
  <div className="row m-b-3">
    <div className="col-md-6 offset-md-3">
      <p><code>{props.name}</code><small className="text-muted m-l-1">{props.example ? `e.g. ${props.example}` : null}</small></p>
      <p>{props.description}</p>
      {props.children}
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
            <p>{COMPONENT_DESCRIPTION}</p>
          </div>
        </div>

        <div className="row m-b-3">
          <div className="col-md-6">
            <CalendarHeatmap
              values={randomValues}
              classForValue={githubClassForValue}
              titleForValue={customTitleForValue}
              tooltipDataAttrs={customTooltipDataAttrs}
              onClick={customOnClick}
            />
          </div>
          <div className="col-md-6">
            <CalendarHeatmap
              values={randomValues}
              classForValue={gitlabClassForValue}
              titleForValue={customTitleForValue}
              tooltipDataAttrs={customTooltipDataAttrs}
              onClick={customOnClick}
            />
          </div>
        </div>

        <div className="text-xs-center m-y-3">
          <p>Install with npm:</p>
          <p className="m-b-3"><code>npm install {COMPONENT_NAME}</code></p>
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>

        <hr />
        <h2 className="text-md-center m-y-3">Configuration</h2>

        <DemoItem
          name="values"
          example="[{ date: '2016-01-01', count: 6 }]"
          description="Required array of objects which each have a date property, which can be a Date object, parseable string, or millisecond timestamp."
        >
        </DemoItem>

        <DemoItem
          name="numDays"
          example="200"
          description="Time span in days."
        >
        </DemoItem>

        <DemoItem
          name="endDate"
          example="new Date()"
          description="End of date range - a Date object, parseable string, or millisecond timestamp."
        >
        </DemoItem>

        <DemoItem
          name="showMonthLabels"
          example="true"
          description="Toggle for removing month labels."
        >
          <div className="row">
            <div className="col-xs-6">
              <CalendarHeatmap
                values={randomValues}
                showMonthLabels={false}
              />
            </div>
          </div>
        </DemoItem>

        <DemoItem
          name="showOutOfRangeDays"
          example="false"
          description="Toggle display of extra days in week that are past endDate and before beginning of range."
        >
          <div className="row">
            <div className="col-xs-6">
              <CalendarHeatmap
                values={randomValues}
                showOutOfRangeDays={true}
              />
            </div>
          </div>
        </DemoItem>

        <DemoItem
          name="horizontal"
          example="true"
          description="Whether to orient horizontally or vertically. Can be used in combination with numDays/endDate to show just the current month."
        >
          <div className="row">
            <div className="col-xs-3">
              <CalendarHeatmap
                values={randomValues}
                numDays={100}
                horizontal={false}
              />
            </div>
            <div className="col-xs-2 offset-xs-1">
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
          example="1"
          description="Size of gutters relative to squares."
        >
          <div className="row">
            <div className="col-xs-6">
              <CalendarHeatmap
                values={randomValues}
                gutterSize={2}
              />
            </div>
          </div>
        </DemoItem>

        <DemoItem
          name="onClick"
          example="(value) => { alert(value) }"
          description="Callback to invoke when a square is clicked."
        >
        </DemoItem>

        <DemoItem
          name="titleForValue"
          example="(value) => `Date is ${value.date}`"
          description="Function to determine each square's title attribute, for generating 3rd party hover tooltips (may also need to configure tooltipDataAttrs)."
        >
        </DemoItem>

        <DemoItem
          name="tooltipDataAttrs"
          example="{ 'data-toggle': 'tooltip' }"
          description="Sets data attributes for all squares, for generating 3rd party hover tooltips (this demo uses bootstrap tooltips)."
        >
        </DemoItem>

        <DemoItem
          name="classForValue"
          example="(value) => (value.count > 0 ? 'blue' : 'white')"
          description="Callback for determining CSS class to apply to each value."
        >
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
