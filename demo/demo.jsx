import React from 'react';
import ReactDOM from 'react-dom';
import CalendarHeatmap from '../src';
import { dateNDaysAgo, shiftDate, getRange } from '../src/helpers';

const today = new Date();
const date100DaysBefore = dateNDaysAgo(100);
const date31DaysBefore = dateNDaysAgo(31);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = today) {
  return getRange(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  })
}

function githubClassForValue(value) {
  if (!value) {
    return 'color-empty';
  } else if (value.count == 3) {
    return "";
  }
  return `color-github-${value.count}`;
}

function gradientFillForValue(value){
  if (value.count == 3) {
    return "url(#redYellow)";
  }
  return "";
}

var myDef = (
        <linearGradient id="redYellow">
          <stop offset="5%" stop-color="#F60" />
          <stop offset="95%" stop-color="#FF6" />
        </linearGradient>
      )

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
  <div className="row mb-3">
    <div className="col-xs-12 col-md-6 offset-md-3">
      <p><code>{props.name}</code><small className="text-muted ml-1">{props.example ? `e.g. ${props.example}` : null}</small></p>
      <p>{props.description}</p>
      <div className="row">
        <div className="col-xs-6 offset-xs-3">
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

class Demo extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-xs-12">
            <div className="text-xs-center">
              <h1 className="mb-2">{COMPONENT_NAME}</h1>
              <p>{COMPONENT_DESCRIPTION}</p>
            </div>
          </div>
        </div>

        <div className="row mb-12">
          <div className="col-xs-12 col-md-6">
            <CalendarHeatmap
              defs={myDef}
              values={randomValues}
              classForValue={githubClassForValue}
              titleForValue={customTitleForValue}
              tooltipDataAttrs={customTooltipDataAttrs}
              onClick={customOnClick}
              fillForValue={gradientFillForValue}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <CalendarHeatmap
              values={randomValues}
              classForValue={gitlabClassForValue}
              titleForValue={customTitleForValue}
              tooltipDataAttrs={customTooltipDataAttrs}
              onClick={customOnClick}
              monthLabels={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
            />
          </div>
        </div>

        <div className="text-xs-center my-3">
          <p>Install with npm:</p>
          <p className="mb-3"><code>npm install {COMPONENT_NAME}</code></p>
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>

        <hr />
        <h2 className="text-xs-center my-3">Props</h2>

        <DemoItem
          name="values"
          example="[{ date: '2016-01-01', count: 6 }]"
          description="Required array of objects which each have a date property, which can be a Date object, parseable string, or millisecond timestamp."
        />

        <DemoItem
          name="startDate"
          example="new Date()"
          description="Start of date range - a Date object, parseable string, or millisecond timestamp."
        />

        <DemoItem
          name="endDate"
          example="new Date()"
          description="End of date range - a Date object, parseable string, or millisecond timestamp."
        />

        <DemoItem
          name="showMonthLabels"
          example="true"
          description="Toggle for removing month labels."
        />

        <DemoItem
          name="showWeekdayLabels"
          example="true"
          description="Toggle for removing weekday labels."
        />

        <DemoItem
          name="showOutOfRangeDays"
          example="false"
          description="Toggle display of extra days in week that are past endDate and before beginning of range."
        />

        <DemoItem
          name="horizontal"
          example="true"
          description="Whether to orient horizontally or vertically. Can be used in combination with startDate/endDate to show just the current month."
        />

        <DemoItem
          name="gutterSize"
          example="1"
          description="Size of gutters relative to squares."
        />

        <DemoItem
          name="onClick"
          example="(value) => { alert(value) }"
          description="Callback to invoke when a square is clicked."
        />

        <DemoItem
          name="onMouseOver"
          example="(event, value) => { console.log(event, value) }"
          description="Callback to invoke when mouse pointer is over a square."
        />

        <DemoItem
          name="onMouseLeave"
          example="(event, value) => { console.log(event, value) }"
          description="Callback to invoke when mouse pointer is left a square."
        />

        <DemoItem
          name="titleForValue"
          example="(value) => `Date is ${value.date}`"
          description="Function to determine each square's title attribute, for generating 3rd party hover tooltips (may also need to configure tooltipDataAttrs)."
        />

        <DemoItem
          name="tooltipDataAttrs"
          example="{ 'data-toggle': 'tooltip' } or (value) => ({ 'data-tooltip': `Tooltip: ${value}` })"
          description="Sets data attributes for all squares, for generating 3rd party hover tooltips (this demo uses bootstrap tooltips)."
        />

        <DemoItem
          name="classForValue"
          example="(value) => (value.count > 0 ? 'blue' : 'white')"
          description="Callback for determining CSS class to apply to each value."
        />

        <DemoItem
          name="monthLabels"
          example="['01', '02', ..., '12']"
          description="An array with 12 strings representing the text from janurary to december"
        />

        <DemoItem
          name="weekdayLabels"
          example="['Sun', 'Mon', ..., 'Sat']"
          description="An array with 7 strings representing the text from Sunday to Saturday"
        />

        <DemoItem
          name="transformDayElement"
          example="(element, value, index) => React.cloneElement(element, {title: `${value.date}, ${index}`)"
          description="A function to further transform generated svg element for a single day, can be used to attach event handlers, add tooltips and more"
        />

        <hr />
        <div className="text-xs-center my-3">
          <a className="btn btn-info btn-lg" href={githubURL}>View project on Github</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Demo), document.getElementById('demo'));
