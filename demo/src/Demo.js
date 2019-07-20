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
    if (!value || !value.date) {
      return null;
    }
    // Configuration for react-tooltip
    return {
      'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
    };
  };

  handleClick = (value) => {
    alert(`You clicked on ${value.date.toISOString().slice(0, 10)} with count: ${value.count}`);
  };

  render() {
    return (
      <div style={{ width: 100 }}>
        <CalendarHeatmap
          startDate={'2019-03-11'}
          endDate={'2019-03-14'}
          values={[
            // This is not showing up
            { date: '2019-03-11', count: 4 },
            { date: '2019-03-12', count: 2 },
            { date: '2019-03-13', count: 1 },
            { date: '2019-03-14', count: 3 },
            { date: '2019-06-21', count: 2 },
          ]}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            return {
              'data-tip': `${value.date} has count: ${value.count}`,
            };
          }}
          showWeekdayLabels={true}
          onClick={(value) => alert(`Clicked on value with count: ${value.count}`)}
        />
        <ReactTooltip />
      </div>
    );
  }
}

export default Demo;
