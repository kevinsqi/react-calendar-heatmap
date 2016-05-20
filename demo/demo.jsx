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
      <p><code>{props.name}</code><small className="text-muted m-l-1">{props.example ? `e.g. ${props.example}` : null}</small></p>
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
          example="200"
          description="Time span in days."
        >
          <CalendarHeatmap
            numDays={400}
            values={randomValues}
          />
        </DemoItem>

        <DemoItem
          name="endDate"
          example="'2016-01-01'"
          description="End of date range - a Date object, parseable string, or millisecond timestamp."
        >
          <CalendarHeatmap
            endDate={halfYearAgo}
            values={pastRandomValues}
          />
        </DemoItem>

        <DemoItem
          name="showMonthLabels"
          example="true"
          description="Toggle for removing month labels."
        >
          <CalendarHeatmap
            values={randomValues}
            showMonthLabels={false}
          />
        </DemoItem>

        <DemoItem
          name="showOutOfRangeDays"
          example="false"
          description="Toggle extra days in week that are past endDate and before beginning of range."
        >
          <CalendarHeatmap
            values={randomValues}
            showOutOfRangeDays={true}
          />
        </DemoItem>

        <DemoItem
          name="horizontal"
          example="true"
          description="Whether to orient horizontally or vertically. Can be used in combination with numDays/endDate to show just the current month."
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
          example="1"
          description="Size of gutters relative to squares."
        >
          <CalendarHeatmap
            values={randomValues}
            gutterSize={2}
          />
        </DemoItem>

        <DemoItem
          name="onClick"
          example="(value) => { alert(value) }"
          description="Callback to invoke when a square is clicked."
        >
          <CalendarHeatmap
            values={randomValues}
            onClick={customOnClick}
          />
        </DemoItem>

        <DemoItem
          name="titleForValue"
          example="(value) => `Date is ${value.date}`"
          description="Function to determine each square's title attribute, for generating 3rd party hover tooltips (may also need to configure tooltipDataAttrs)."
        >
          <CalendarHeatmap
            values={randomValues}
            titleForValue={customTitleForValue}
            tooltipDataAttrs={customTooltipDataAttrs}
          />
        </DemoItem>

        <DemoItem
          name="tooltipDataAttrs"
          example="{ 'data-toggle': 'tooltip' }"
          description="Sets data attributes for all squares, for generating 3rd party hover tooltips (this demo uses bootstrap tooltips)."
        >
          <CalendarHeatmap
            values={randomValues}
            titleForValue={customTitleForValue}
            tooltipDataAttrs={customTooltipDataAttrs}
          />
        </DemoItem>

        <DemoItem
          name="classForValue"
          example="(value) => (value.count > 0 ? 'blue' : 'white')"
          description="Callback for determining CSS class to apply to each value."
        >
          <CalendarHeatmap
            values={randomValues}
            classForValue={githubClassForValue}
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
