import React from 'react';

function CalendarHeatmap({ values, renderItem }) {
  return <svg viewBox={`0 0 100 100`}>{values.map((value) => renderItem(value))}</svg>;
}

export default CalendarHeatmap;
