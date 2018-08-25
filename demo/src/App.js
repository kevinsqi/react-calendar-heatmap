import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/build/styles.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>react-calendar-heatmap</h1>

        <div>
          <CalendarHeatmap
            startDate={new Date('2016-01-01')}
            endDate={new Date('2016-04-01')}
            values={[
              { date: '2016-01-05', count: 4 },
              { date: '2016-01-10', count: 3 },
              { date: '2016-01-22', count: 1 },
              { date: '2016-01-30', count: 2 },
              // ...and so on
            ]}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
