import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { DAYS_IN_WEEK, MILLISECONDS_IN_ONE_DAY, DAY_LABELS, MONTH_LABELS } from './constants';
import {
  dateNDaysAgo,
  shiftDate,
  getBeginningTimeForDate,
  convertToDate,
  getRange,
} from './helpers';

const SQUARE_SIZE = 10;
const MONTH_LABEL_GUTTER_SIZE = 4;
const CSS_PSEDUO_NAMESPACE = 'react-calendar-heatmap-';

const CalendarHeatmap = (props) => {
  const [valueCache, setValueCache] = useState();

  useEffect(() => {
    setValueCache(getValueCache(props));
  }, [props]);

  const getDateDifferenceInDays = () => {
    const { startDate, numDays } = props;
    if (numDays) {
      // eslint-disable-next-line no-console
      console.warn(
        'numDays is a deprecated prop. It will be removed in the next release. Consider using the startDate prop instead.',
      );
      return numDays;
    }
    const timeDiff = getEndDate() - convertToDate(startDate);
    return Math.ceil(timeDiff / MILLISECONDS_IN_ONE_DAY);
  };

  const getSquareSizeWithGutter = () => {
    return SQUARE_SIZE + props.gutterSize;
  };

  const getMonthLabelSize = () => {
    if (!props.showMonthLabels) {
      return 0;
    }
    if (props.horizontal) {
      return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;
    }
    return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE);
  };

  const getWeekdayLabelSize = () => {
    if (!props.showWeekdayLabels) {
      return 0;
    }
    if (props.horizontal) {
      return 30;
    }
    return SQUARE_SIZE * 1.5;
  };

  const getStartDate = () => {
    return shiftDate(getEndDate(), -getDateDifferenceInDays() + 1); // +1 because endDate is inclusive
  };

  const getEndDate = () => {
    return getBeginningTimeForDate(convertToDate(props.endDate));
  };

  const getStartDateWithEmptyDays = () => {
    return shiftDate(getStartDate(), -getNumEmptyDaysAtStart());
  };

  const getNumEmptyDaysAtStart = () => {
    return getStartDate().getDay();
  };

  const getNumEmptyDaysAtEnd = () => {
    return DAYS_IN_WEEK - 1 - getEndDate().getDay();
  };

  const getWeekCount = () => {
    const numDaysRoundedToWeek =
      getDateDifferenceInDays() + getNumEmptyDaysAtStart() + getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  };

  const getWeekWidth = () => {
    return DAYS_IN_WEEK * getSquareSizeWithGutter();
  };

  const getWidth = () => {
    return getWeekCount() * getSquareSizeWithGutter() - (props.gutterSize - getWeekdayLabelSize());
  };

  const getHeight = () => {
    return getWeekWidth() + (getMonthLabelSize() - props.gutterSize) + getWeekdayLabelSize();
  };

  const getValueCache = memoizeOne((props) =>
    props.values.reduce((memo, value) => {
      const date = convertToDate(value.date);
      const index = Math.floor((date - getStartDateWithEmptyDays()) / MILLISECONDS_IN_ONE_DAY);
      // eslint-disable-next-line no-param-reassign
      memo[index] = {
        value,
        className: props.classForValue(value),
        title: props.titleForValue ? props.titleForValue(value) : null,
        tooltipDataAttrs: getTooltipDataAttrsForValue(value),
      };
      return memo;
    }, {}),
  );

  const getValueForIndex = (index) => {
    if (valueCache[index]) {
      return valueCache[index].value;
    }
    return null;
  };

  const getClassNameForIndex = (index) => {
    if (valueCache[index]) {
      return valueCache[index].className;
    }
    return props.classForValue(null);
  };

  const getTitleForIndex = (index) => {
    if (valueCache[index]) {
      return valueCache[index].title;
    }
    return props.titleForValue ? props.titleForValue(null) : null;
  };

  const getTooltipDataAttrsForIndex = (index) => {
    if (valueCache[index]) {
      return valueCache[index].tooltipDataAttrs;
    }
    return getTooltipDataAttrsForValue({ date: null, count: null });
  };

  const getTooltipDataAttrsForValue = (value) => {
    const { tooltipDataAttrs } = props;

    if (typeof tooltipDataAttrs === 'function') {
      return tooltipDataAttrs(value);
    }
    return tooltipDataAttrs;
  };

  const getTransformForWeek = (weekIndex) => {
    if (props.horizontal) {
      return `translate(${weekIndex * getSquareSizeWithGutter()}, 0)`;
    }
    return `translate(0, ${weekIndex * getSquareSizeWithGutter()})`;
  };

  const getTransformForWeekdayLabels = () => {
    if (props.horizontal) {
      return `translate(${SQUARE_SIZE}, ${getMonthLabelSize()})`;
    }
    return null;
  };

  const getTransformForMonthLabels = () => {
    if (props.horizontal) {
      return `translate(${getWeekdayLabelSize()}, 0)`;
    }
    return `translate(${getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, ${getWeekdayLabelSize()})`;
  };

  const getTransformForAllWeeks = () => {
    if (props.horizontal) {
      return `translate(${getWeekdayLabelSize()}, ${getMonthLabelSize()})`;
    }
    return `translate(0, ${getWeekdayLabelSize()})`;
  };

  const getViewBox = () => {
    if (props.horizontal) {
      return `0 0 ${getWidth()} ${getHeight()}`;
    }
    return `0 0 ${getHeight()} ${getWidth()}`;
  };

  const getSquareCoordinates = (dayIndex) => {
    if (props.horizontal) {
      return [0, dayIndex * getSquareSizeWithGutter()];
    }
    return [dayIndex * getSquareSizeWithGutter(), 0];
  };

  const getWeekdayLabelCoordinates = (dayIndex) => {
    if (props.horizontal) {
      return [0, (dayIndex + 1) * SQUARE_SIZE + dayIndex * props.gutterSize];
    }
    return [dayIndex * SQUARE_SIZE + dayIndex * props.gutterSize, SQUARE_SIZE];
  };

  const getMonthLabelCoordinates = (weekIndex) => {
    if (props.horizontal) {
      return [weekIndex * getSquareSizeWithGutter(), getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE];
    }
    const verticalOffset = -2;
    return [0, (weekIndex + 1) * getSquareSizeWithGutter() + verticalOffset];
  };

  const handleClick = (value) => {
    if (props.onClick) {
      props.onClick(value);
    }
  };

  const handleMouseOver = (e, value) => {
    if (props.onMouseOver) {
      props.onMouseOver(e, value);
    }
  };

  const handleMouseLeave = (e, value) => {
    if (props.onMouseLeave) {
      props.onMouseLeave(e, value);
    }
  };

  const renderSquare = (dayIndex, index) => {
    const indexOutOfRange =
      index < getNumEmptyDaysAtStart() ||
      index >= getNumEmptyDaysAtStart() + getDateDifferenceInDays();
    if (indexOutOfRange && !props.showOutOfRangeDays) {
      return null;
    }
    const [x, y] = getSquareCoordinates(dayIndex);
    const value = getValueForIndex(index);
    const rect = (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x}
        y={y}
        className={getClassNameForIndex(index)}
        onClick={() => handleClick(value)}
        onMouseOver={(e) => handleMouseOver(e, value)}
        onMouseLeave={(e) => handleMouseLeave(e, value)}
        {...getTooltipDataAttrsForIndex(index)}
      >
        <title>{getTitleForIndex(index)}</title>
      </rect>
    );
    const { transformDayElement } = props;
    return transformDayElement ? transformDayElement(rect, value, index) : rect;
  };

  const renderWeek = (weekIndex) => {
    return (
      <g
        key={weekIndex}
        transform={getTransformForWeek(weekIndex)}
        className={`${CSS_PSEDUO_NAMESPACE}week`}
      >
        {getRange(DAYS_IN_WEEK).map((dayIndex) =>
          renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex),
        )}
      </g>
    );
  };

  const renderAllWeeks = () => {
    return getRange(getWeekCount()).map((weekIndex) => renderWeek(weekIndex));
  };

  const renderMonthLabels = () => {
    if (!props.showMonthLabels) {
      return null;
    }
    const weekRange = getRange(getWeekCount() - 1); // don't render for last week, because label will be cut off
    return weekRange.map((weekIndex) => {
      const endOfWeek = shiftDate(getStartDateWithEmptyDays(), (weekIndex + 1) * DAYS_IN_WEEK);
      const [x, y] = getMonthLabelCoordinates(weekIndex);
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <text key={weekIndex} x={x} y={y} className={`${CSS_PSEDUO_NAMESPACE}month-label`}>
          {props.monthLabels[endOfWeek.getMonth()]}
        </text>
      ) : null;
    });
  };

  const renderWeekdayLabels = () => {
    if (!props.showWeekdayLabels) {
      return null;
    }
    return props.weekdayLabels.map((weekdayLabel, dayIndex) => {
      const [x, y] = getWeekdayLabelCoordinates(dayIndex);
      const cssClasses = `${
        props.horizontal ? '' : `${CSS_PSEDUO_NAMESPACE}small-text`
      } ${CSS_PSEDUO_NAMESPACE}weekday-label`;
      // eslint-disable-next-line no-bitwise
      return dayIndex & 1 ? (
        <text key={`${x}${y}`} x={x} y={y} className={cssClasses}>
          {weekdayLabel}
        </text>
      ) : null;
    });
  };

  return (
    <svg className="react-calendar-heatmap" viewBox={getViewBox()}>
      <g transform={getTransformForMonthLabels()} className={`${CSS_PSEDUO_NAMESPACE}month-labels`}>
        {renderMonthLabels()}
      </g>
      <g transform={getTransformForAllWeeks()} className={`${CSS_PSEDUO_NAMESPACE}all-weeks`}>
        {renderAllWeeks()}
      </g>
      <g
        transform={getTransformForWeekdayLabels()}
        className={`${CSS_PSEDUO_NAMESPACE}weekday-labels`}
      >
        {renderWeekdayLabels()}
      </g>
    </svg>
  );
};

CalendarHeatmap.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
        .isRequired,
    }).isRequired,
  ).isRequired, // array of objects with date and arbitrary metadata
  numDays: PropTypes.number, // number of days back from endDate to show
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]), // start of date range
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]), // end of date range
  gutterSize: PropTypes.number, // size of space between squares
  horizontal: PropTypes.bool, // whether to orient horizontally or vertically
  showMonthLabels: PropTypes.bool, // whether to show month labels
  showWeekdayLabels: PropTypes.bool, // whether to show weekday labels
  showOutOfRangeDays: PropTypes.bool, // whether to render squares for extra days in week after endDate, and before start date
  tooltipDataAttrs: PropTypes.oneOfType([PropTypes.object, PropTypes.func]), // data attributes to add to square for setting 3rd party tooltips, e.g. { 'data-toggle': 'tooltip' } for bootstrap tooltips
  titleForValue: PropTypes.func, // function which returns title text for value
  classForValue: PropTypes.func, // function which returns html class for value
  monthLabels: PropTypes.arrayOf(PropTypes.string), // An array with 12 strings representing the text from janurary to december
  weekdayLabels: PropTypes.arrayOf(PropTypes.string), // An array with 7 strings representing the text from Sun to Sat
  onClick: PropTypes.func, // callback function when a square is clicked
  onMouseOver: PropTypes.func, // callback function when mouse pointer is over a square
  onMouseLeave: PropTypes.func, // callback function when mouse pointer is left a square
  transformDayElement: PropTypes.func, // function to further transform the svg element for a single day
};

CalendarHeatmap.defaultProps = {
  numDays: null,
  startDate: dateNDaysAgo(200),
  endDate: new Date(),
  gutterSize: 1,
  horizontal: true,
  showMonthLabels: true,
  showWeekdayLabels: false,
  showOutOfRangeDays: false,
  tooltipDataAttrs: null,
  titleForValue: null,
  classForValue: (value) => (value ? 'color-filled' : 'color-empty'),
  monthLabels: MONTH_LABELS,
  weekdayLabels: DAY_LABELS,
  onClick: null,
  onMouseOver: null,
  onMouseLeave: null,
  transformDayElement: null,
};

export default CalendarHeatmap;
