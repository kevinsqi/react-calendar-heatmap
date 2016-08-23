# React Calendar Heatmap

A calendar heatmap component built on SVG, inspired by github's commit calendar graph. The component expands to size of container and is super configurable. [See a live demo](http://patientslikeme.github.io/react-calendar-heatmap/).

[![npm version](https://badge.fury.io/js/react-calendar-heatmap.svg)](https://badge.fury.io/js/react-calendar-heatmap)
[![Build Status](https://travis-ci.org/patientslikeme/react-calendar-heatmap.svg?branch=master)](https://travis-ci.org/patientslikeme/react-calendar-heatmap)

[![react-calendar-heatmap screenshot](/assets/react-calendar-heatmap.png?raw=true)](http://patientslikeme.github.io/react-calendar-heatmap/)

## Installation

Install the npm module:

```bash
npm install react-calendar-heatmap
```

Include the default styles into your CSS by copying [src/styles.css](src/styles.css) into your repo, and customize away!

## Usage

Import the component:

```javascript
import CalendarHeatmap from 'react-calendar-heatmap';
```

To show a basic heatmap of 100 days ending on April 1st:

```javascript
<CalendarHeatmap
  endDate={new Date('2016-04-01')}
  numDays={100}
  values={[
    { date: '2016-01-01' },
    { date: '2016-01-22' },
    { date: '2016-01-30' },
    // ...and so on
  ]}
/>
```

## Configuring colors

To use the color scale shown in the [live demo](http://patientslikeme.github.io/react-calendar-heatmap/) based on the github contribution graph, you can set the `classForValue` prop, a function that determines which CSS class to apply to each value:

```javascript
<CalendarHeatmap
  values={[
    { date: '2016-01-01', count: 1 },
    { date: '2016-01-03', count: 4 },
    { date: '2016-01-06', count: 2 },
    // ...and so on
  ]}
  classForValue={(value) => {
    if (!value) {
      return 'color-empty';
    }
    return `color-scale-${value.count}`;
  }}
/>
```

Then you use CSS to set colors for each class:

```css
.react-calendar-heatmap .color-scale-1 { fill: #d6e685; }
.react-calendar-heatmap .color-scale-2 { fill: #8cc665; }
.react-calendar-heatmap .color-scale-3 { fill: #44a340; }
.react-calendar-heatmap .color-scale-4 { fill: #1e6823; }
```

## Other configuration

See full configuration options on the [live demo page](http://patientslikeme.github.io/react-calendar-heatmap/).

## Development

To run demo locally on localhost:8080:

```bash
npm install
npm start
```

Keep [CI tests](https://travis-ci.org/patientslikeme/react-calendar-heatmap) passing by running `npm test` and `npm run lint` often.

Deploy updates to the demo page with `npm run deploy:demo`.

## License

react-calendar-heatmap is Copyright &copy; 2016 PatientsLikeMe, Inc. and is released under an MIT License.  See COPYING for details.
