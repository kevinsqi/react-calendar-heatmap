import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

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
    if (!value || !value.date) return null;
    // Configuration for react-tooltip
    return {
      'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
    };
  };

  summarizeWeek = (weekValue) => {
    return weekValue.values.map((v) => v.count).reduce((a, b) => a + b, 0);
  };

  getWeeklyTooltipDataAttrs = (weekValue) => {
    if (!weekValue || (!weekValue.week && weekValue.week !== 0)) return null;
    const count = this.summarizeWeek(weekValue);
    return {
      'data-tip': `Week ${weekValue.week + 1} has total count: ${count}`,
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
              classForWeekSummaryValue={(weekValue) => {
                if (!weekValue) return 'color-empty';

                const count = this.summarizeWeek(weekValue);
                if (count < 8) return 'color-empty';
                return `color-gitlab-${count % 5}`;
              }}
              tooltipDataAttrs={this.getTooltipDataAttrs}
              weekSummaryTooltipDataAttrs={this.getWeeklyTooltipDataAttrs}
              onClick={this.handleClick}
              showWeekdayLabels
              weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              showWeekSummaries
              weekSummary
              weekSummariesSquaresOffset={0}
              weekStartDay={1}
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
        <ReactTooltip />
      </div>
    );
  }
}

export default Demo;
