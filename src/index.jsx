import 'style!css!./styles.css';

import React, { PropTypes } from 'react';
import range from 'lodash.range';
import reduce from 'lodash.reduce';
import { DAYS_IN_WEEK, MILLISECONDS_IN_ONE_DAY, MONTH_LABELS } from './constants';
import { shiftDate, getBeginningTimeForDate } from './dateHelpers';

const SQUARE_SIZE = 10;
const MONTH_LABEL_GUTTER_SIZE = 4;

class CalendarHeatmap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueCache: this.getValueCache(props.values),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      valueCache: this.getValueCache(nextProps.values),
    });
  }

  handleClick(value) {
    if (this.props.onClick) {
      this.props.onClick(value);
    }
  }

  getSquareSizeWithGutter() {
    return SQUARE_SIZE + this.props.gutterSize;
  }

  getMonthLabelSize() {
    return this.props.showMonthLabels ? (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE) : 0;
  }

  getStartDate() {
    return shiftDate(getBeginningTimeForDate(this.props.endDate), -this.props.numDays + 1); // +1 because endDate is inclusive
  }

  getStartDateWithEmptyDays() {
    return shiftDate(this.getStartDate(), -this.getNumEmptyDaysAtStart());
  }

  getNumEmptyDaysAtStart() {
    return this.getStartDate().getDay();
  }

  getNumEmptyDaysAtEnd() {
    return (DAYS_IN_WEEK - 1) - this.props.endDate.getDay();
  }

  getWeekCount() {
    const numDaysRoundedToWeek = this.props.numDays + this.getNumEmptyDaysAtStart() + this.getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  }

  getWidth() {
    return this.getWeekCount() * this.getSquareSizeWithGutter() - this.props.gutterSize;
  }

  getHeight() {
    return DAYS_IN_WEEK * this.getSquareSizeWithGutter() + this.getMonthLabelSize() + this.getLegendDimensions().outerHeight - this.props.gutterSize;
  }

  getValueCache(values) {
    return reduce(values, (memo, value) => {
      const date = (value.date instanceof Date) ? value.date : (new Date(value.date));
      const index = Math.floor((date - this.getStartDateWithEmptyDays()) / MILLISECONDS_IN_ONE_DAY);
      memo[index] = {
        value: value,
        className: this.props.classForValue(value),
        title: this.props.titleForValue(value),
      };
      return memo;
    }, {});
  }

  getValueForIndex(index) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].value;
    } else {
      return null;
    }
  }

  getClassNameForIndex(index) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].className;
    } else {
      return this.props.classForValue(null);
    }
  }

  getTitleForIndex(index) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index].title;
    } else {
      return this.props.titleForValue(null);
    }
  }

  getLegendDimensions() {
    const { legendConfig } = this.props;
    const legendKeyHeight = 10 + this.props.gutterSize;
    if (legendConfig) {
      return {
        keyWidth: 150,
        keyHeight: legendKeyHeight,
        outerHeight: legendKeyHeight * legendConfig.length
      }
    }
    return {
      outerHeight: 0
    };
  }

  renderLegend() {
    const { legendConfig } = this.props;
    if (legendConfig) {
      const {keyWidth, keyHeight, outerHeight} = this.getLegendDimensions();
      return (
        <g
          transform={`translate(0, ${this.getHeight() - outerHeight})`}
          className="react-calendar-heatmap-legend"
          height={outerHeight}
          width={this.getWidth()}
        >
          {legendConfig.map((key, index) => {
            let yPos = keyHeight * (index + 1);
            return (
              <g>
                <rect
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                  y={yPos - keyHeight + this.props.gutterSize + 1}
                  className={key.className}
                />
                <text y={yPos} x={SQUARE_SIZE + this.props.gutterSize} key={index}>
                  {key.label}
                </text>
              </g>
            )
          })}
        </g>
      );
    }
    return null;
  }

  renderSquare(dayIndex, index) {
    const indexOutOfRange = index < this.getNumEmptyDaysAtStart() || index >= this.getNumEmptyDaysAtStart() + this.props.numDays;
    if (indexOutOfRange && !this.props.showOutOfRangeDays) {
      return null;
    }
    return (
      <rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        y={dayIndex * this.getSquareSizeWithGutter()}
        className={this.getClassNameForIndex(index)}
        onClick={this.handleClick.bind(this, this.getValueForIndex(index))}
      >
        <title>{this.getTitleForIndex(index)}</title>
      </rect>
    );
  }

  renderWeek(weekIndex) {
    return (
      <g key={weekIndex} transform={`translate(${weekIndex * this.getSquareSizeWithGutter()}, 0)`}>
        {range(DAYS_IN_WEEK).map((dayIndex) => this.renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex))}
      </g>
    );
  }

  renderAllWeeks() {
    return range(this.getWeekCount()).map((weekIndex) => this.renderWeek(weekIndex));
  }

  renderMonthLabels() {
    if (!this.props.showMonthLabels) {
      return null;
    }
    const weekRange = range(this.getWeekCount() - 1);  // don't render for last week, because label will be cut off
    return weekRange.map((weekIndex) => {
      const endOfWeek = shiftDate(this.getStartDateWithEmptyDays(), (weekIndex + 1) * DAYS_IN_WEEK);

      return (endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK) ? (
        <g>
          <text
            key={weekIndex}
            x={weekIndex * this.getSquareSizeWithGutter()}
            y={this.getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE}
          >
            {MONTH_LABELS[endOfWeek.getMonth()]}
          </text>
        </g>
      ) : null;
    });
  }

  render() {
    return (
      <svg
        className="react-calendar-heatmap"
        viewBox={`0 0 ${this.getWidth()} ${this.getHeight()}`}
      >
        {this.renderMonthLabels()}
        <g transform={`translate(0, ${this.getMonthLabelSize()})`}>
          {this.renderAllWeeks()}
        </g>
        {this.renderLegend()}
      </svg>
    );
  }
}

CalendarHeatmap.propTypes = {
  values: PropTypes.arrayOf(             // array of objects with date and arbitrary metadata
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
    }).isRequired
  ).isRequired,
  numDays: PropTypes.number,             // number of days back from endDate to show
  endDate: PropTypes.instanceOf(Date),   // end of date range
  gutterSize: PropTypes.number,          // size of space between squares
  showMonthLabels: PropTypes.bool,       // whether to show month labels
  showOutOfRangeDays: PropTypes.bool,    // whether to render squares for extra days in week after endDate, and before start date
  titleForValue: PropTypes.func,         // function which returns title text for value
  classForValue: PropTypes.func,         // function which returns html class for value
  onClick: PropTypes.func,               // callback function when a square is clicked
  orientation: PropTypes.oneOf([
    'horizontal', 'vertical'
  ]),
  legendConfig: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      label: PropTypes.string,
    })
  )
};

CalendarHeatmap.defaultProps = {
  orientation: 'horizontal',
  numDays: 200,
  endDate: new Date(),
  gutterSize: 1,
  showMonthLabels: true,
  showOutOfRangeDays: false,
  titleForValue: (value) => {
    return value ? JSON.stringify(value) : null;
  },
  classForValue: (value) => {
    return value ? 'color-filled' : 'color-empty';
  },
};

export default CalendarHeatmap;
