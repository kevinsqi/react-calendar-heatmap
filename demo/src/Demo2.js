import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

function Demo2() {
  return (
    <CalendarHeatmap
      values={[
        { date: new Date(2019, 1, 1), count: 10 },
        { date: new Date(2019, 1, 10), count: 5 },
        { date: new Date(2019, 2, 2), count: 18 },
      ]}
      renderItem={(value) => {
        return <rect x={5} y={10} width={10} height={10} style={{ fill: '#f00' }} />;
      }}
    />
  );
}

export default Demo2;
