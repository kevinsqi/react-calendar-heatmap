import React, { Component } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import './App.css';
import Demo from './Demo';

class App extends Component {
  render() {
    return (
      <div className="container py-5">
        <div className="text-sm-center">
          <h1>react-calendar-heatmap</h1>
          <p>
            A calendar heatmap component built on SVG, inspired by github’s commit calendar graph.
          </p>
        </div>

        <div className="mt-5">
          <Demo />
        </div>

        <hr className="mt-5" />

        <div className="text-sm-center mt-5">
          <h2>Installation</h2>
          <div className="mt-4">Install with yarn or npm:</div>
          <div className="mt-3">
            <code className="p-2 text-dark bg-yellow">yarn add react-calendar-heatmap</code>
          </div>
          <div className="mt-5">
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
