import React, { PropTypes } from 'react';
import range from 'lodash.range';
import reduce from 'lodash.reduce';
import { DAYS_IN_WEEK, MILLISECONDS_IN_ONE_DAY, MONTH_LABELS } from './constants';

function getBeginningOfDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

class CalendarHeatmap extends React.Component {
  constructor(props) {
    super(props);

    this.startDate = new Date(getBeginningOfDate(props.endDate));
    this.startDate.setDate(this.startDate.getDate() - (props.numDays - 1));  // numDays - 1 because endDate is inclusive
    this.emptyDaysAtStart = this.startDate.getDay();
    const emptyDaysAtEnd = (DAYS_IN_WEEK - 1) - props.endDate.getDay();
    const numDaysRoundedToWeek = props.numDays + this.emptyDaysAtStart + emptyDaysAtEnd;
    this.startDateWithEmptyDays = new Date(this.startDate);
    this.startDateWithEmptyDays.setDate(this.startDate.getDate() - this.emptyDaysAtStart);

    this.valueAttributes = reduce(props.values, (memo, value) => {
      const index = Math.floor((value.date - this.startDateWithEmptyDays) / MILLISECONDS_IN_ONE_DAY);
      memo[index] = {
        value: value,
        className: props.classForValue(value),
        title: props.titleForValue(value),
      };
      return memo;
    }, {});

    this.squareSize = 10;
    this.squareSizeWithGutter = this.squareSize + props.gutterSize;
    this.monthLabelGutterSize = 4;
    this.monthLabelSize = props.showMonthLabels ? (this.squareSize + this.monthLabelGutterSize) : 0;
    this.weekCount = Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
    this.width = this.weekCount * this.squareSizeWithGutter - props.gutterSize;
    this.height = DAYS_IN_WEEK * this.squareSizeWithGutter + this.monthLabelSize - props.gutterSize;
  }

  handleClick(value) {
    if (this.props.onClick) {
      this.props.onClick(value);
    }
  }

  getValueForIndex(index) {
    if (this.valueAttributes[index]) {
      return this.valueAttributes[index].value;
    } else {
      return null;
    }
  }

  getClassNameForIndex(index) {
    if (this.valueAttributes[index]) {
      return this.valueAttributes[index].className;
    } else {
      return this.props.classForValue(null);
    }
  }

  getTitleForIndex(index) {
    if (this.valueAttributes[index]) {
      return this.valueAttributes[index].title;
    } else {
      return this.props.titleForValue(null);
    }
  }

  renderSquare(dayIndex, index) {
    const indexOutOfRange = index < this.emptyDaysAtStart || index >= this.emptyDaysAtStart + this.props.numDays;
    if (indexOutOfRange && !this.props.showOutOfRangeDays) {
      return null;
    }
    return (
      <rect
        key={index}
        width={this.squareSize}
        height={this.squareSize}
        y={dayIndex * this.squareSizeWithGutter}
        className={this.getClassNameForIndex(index)}
        onClick={this.handleClick.bind(this, this.getValueForIndex(index))}
      >
        <title>{this.getTitleForIndex(index)}</title>
      </rect>
    );
  }

  renderWeek(weekIndex) {
    return (
      <g key={weekIndex} transform={`translate(${weekIndex * this.squareSizeWithGutter}, 0)`}>
        {range(DAYS_IN_WEEK).map((dayIndex) => this.renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex))}
      </g>
    );
  }

  renderAllWeeks() {
    return range(this.weekCount).map((weekIndex) => this.renderWeek(weekIndex));
  }

  renderMonthLabels() {
    if (!this.props.showMonthLabels) {
      return null;
    }
    return range(this.weekCount).map((weekIndex) => {
      const weekEndDate = new Date(this.startDateWithEmptyDays);
      weekEndDate.setDate(this.startDateWithEmptyDays.getDate() + (weekIndex + 1) * DAYS_IN_WEEK);

      return (weekEndDate.getDate() >= 1 && weekEndDate.getDate() <= DAYS_IN_WEEK) ? (
        <text
          key={weekIndex}
          x={weekIndex * this.squareSizeWithGutter}
          y={this.monthLabelSize - this.monthLabelGutterSize}
        >
          {MONTH_LABELS[weekEndDate.getMonth()]}
        </text>
      ) : null;
    });
  }

  render() {
    return (
      <svg
        className="react-calendar-heatmap"
        viewBox={`0 0 ${this.width} ${this.height}`}
      >
        <g>
          {this.renderMonthLabels()}
        </g>
        <g transform={`translate(0, ${this.monthLabelSize})`}>
          {this.renderAllWeeks()}
        </g>
      </svg>
    );
  }
}

CalendarHeatmap.propTypes = {
  values: PropTypes.arrayOf(             // array of objects with date and arbitrary metadata
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
    }).isRequired
  ).isRequired,
  numDays: PropTypes.number,             // number of days back from endDate to show
  endDate: PropTypes.instanceOf(Date),   // end of date range
  gutterSize: PropTypes.number,          // size of space between squares
  showMonthLabels: PropTypes.bool,       // whether to show month labels
  showOutOfRangeDays: PropTypes.bool,   // whether to render squares for extra days in week after endDate, and before start date
  titleForValue: PropTypes.func,         // function which returns title text for value
  classForValue: PropTypes.func,         // function which returns html class for value
  onClick: PropTypes.func,               // callback function when a square is clicked
};

CalendarHeatmap.defaultProps = {
  numDays: 200,
  endDate: new Date(),
  gutterSize: 1,
  showMonthLabels: true,
  showOutOfRangeDays: false,
  titleForValue: (value) => {
    return value ? JSON.stringify(value) : null;
  },
  classForValue: (value) => {
    if (!value) {
      return 'color-empty';
    } else if (value.count < 7) {
      return 'color-small';
    } else if (value.count < 14) {
      return 'color-medium';
    } else if (value.count < 20) {
      return 'color-large';
    } else {
      return 'color-huge';
    }
  },
};

export default CalendarHeatmap;
