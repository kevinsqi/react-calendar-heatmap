import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/build/styles.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-sm-center mt-5">
          <h1>react-calendar-heatmap</h1>
          <p>
            A calendar heatmap component built on SVG, inspired by github’s commit calendar graph.
          </p>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-sm-6">
            <CalendarHeatmap
              startDate={new Date('2016-01-01')}
              endDate={new Date('2016-04-01')}
              values={[
                { date: '2016-01-05', count: 4 },
                { date: '2016-01-10', count: 3 },
                { date: '2016-01-22', count: 1 },
                { date: '2016-01-30', count: 2 },
              ]}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-github-${value.count}`;
              }}
            />
          </div>

          <hr />

          <div classname="text-sm-center mt-5">
            <h2>Installation</h2>
            <div>Install with yarn or npm:</div>
            <a
              className="btn btn-info btn-lg"
              href="https://github.com/patientslikeme/react-calendar-heatmap"
            >
              View docs on Github
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
