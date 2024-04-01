import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
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

class Demo extends React.Component {
  state = {
    values: generateRandomValues(200),
  };

  generateValues = () => {
    this.setState({
      values: generateRandomValues(200),
    });
  };

  getTooltipDataAttrs = (value) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null;
    }
    // Configuration for react-tooltip
    return {
      'data-tooltip-id': "my-tooltip",
      'data-tooltip-content': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
    };
  };

  handleClick = (value) => {
    alert(`You clicked on ${value.date.toISOString().slice(0, 10)} with count: ${value.count}`);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <CalendarHeatmap
              values={this.state.values}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-github-${value.count}`;
              }}
              tooltipDataAttrs={this.getTooltipDataAttrs}
              onClick={this.handleClick}
            />
          </div>
          <div className="col-12 col-sm-6">
            <CalendarHeatmap
              values={this.state.values}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-gitlab-${value.count}`;
              }}
              tooltipDataAttrs={this.getTooltipDataAttrs}
              onClick={this.handleClick}
            />
          </div>
        </div>{' '}
        <div className="text-sm-center mt-4">
          <button className="btn btn-link btn-sm text-secondary" onClick={this.generateValues}>
            Regenerate values
          </button>
        </div>
        <Tooltip id="my-tooltip" />
      </div>
    );
  }
}

export default Demo;
