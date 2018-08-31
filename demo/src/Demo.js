import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValues(count, date = new Date()) {
  return getRange(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  });
}

const randomValues = generateRandomValues(200);

class Demo extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 col-sm-6">
          <CalendarHeatmap
            values={randomValues}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
          />
        </div>
        <div className="col-12 col-sm-6">
          <CalendarHeatmap
            values={randomValues}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-gitlab-${value.count}`;
            }}
          />
        </div>
      </div>
    );
  }
}

export default Demo;
