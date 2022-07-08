import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

const shiftDate = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const getRange = (count) => {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomValues = (count, date = new Date()) => {
  return getRange(count).map((index) => {
    return {
      date: shiftDate(date, -index),
      count: getRandomInt(1, 3),
    };
  });
}

const Demo = () => {
  const [stateValues, setStateValues] = useState({ values: generateRandomValues(200) });

  const generateValues = () => {
    setStateValues({ values: generateRandomValues(200) });
  };

  const getTooltipDataAttrs = (value) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null;
    }
    // Configuration for react-tooltip
    return {
      'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
    };
  };

  const handleClick = (value) => {
    alert(`You clicked on ${value.date.toISOString().slice(0, 10)} with count: ${value.count}`);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 col-sm-6">
          <CalendarHeatmap
            values={stateValues.values}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={getTooltipDataAttrs}
            onClick={handleClick}
          />
        </div>
        <div className="col-12 col-sm-6">
          <CalendarHeatmap
            values={stateValues.values}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-gitlab-${value.count}`;
            }}
            tooltipDataAttrs={getTooltipDataAttrs}
            onClick={handleClick}
          />
        </div>
      </div>{' '}
      <div className="text-sm-center mt-4">
        <button className="btn btn-link btn-sm text-secondary" onClick={generateValues}>
          Regenerate values
        </button>
      </div>
      <ReactTooltip />
    </div>
  );
};

export default Demo;
