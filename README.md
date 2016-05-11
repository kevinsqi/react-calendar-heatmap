# React Calendar Heatmap

A calendar heatmap component built on SVG, inspired by github's contribution graph. The SVG expands to size of container and colors are fully configurable. [See a live demo](http://patientslikeme.github.io/react-calendar-heatmap/).

[![npm version](https://badge.fury.io/js/react-calendar-heatmap.svg)](https://badge.fury.io/js/react-calendar-heatmap)
[![Build Status](https://travis-ci.org/patientslikeme/react-calendar-heatmap.svg?branch=master)](https://travis-ci.org/patientslikeme/react-calendar-heatmap)

[![react-calendar-heatmap screenshot](/assets/react-calendar-heatmap.png?raw=true)](http://patientslikeme.github.io/react-calendar-heatmap/)

## Usage

Install the npm module:

```bash
npm install react-calendar-heatmap
```

Include the default styles into your CSS by copying [src/styles.css](src/styles.css) into your repo.

Import the component:

```javascript
import CalendarHeatmap from 'react-calendar-heatmap';
```

To show a heatmap of 100 days ending on April 1st:

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

## Configuring colors and styles

If you want to map values to colors in a different way, override the `classForValue` prop, which determines which CSS class to apply to each value.

```javascript
<CalendarHeatmap
  values={[
    { date: '2016-01-01', state: 'good' },
    { date: '2016-01-05', state: 'bad' }
  ]}
  classForValue={
    (value) => {
      switch(value.state) {
        case 'good':
          return 'green';
        case 'bad':
          return 'red';
        default:
          return 'gray';
      }
    }
  }
/>
```

Then you can use your own CSS classes to set box colors:

```css
.react-calendar-heatmap .green {
  fill: #6f6;
}
```

See more configuration options on the [live demo page](http://patientslikeme.github.io/react-calendar-heatmap/).

## Development

To develop locally:

```bash
npm install
npm start
```

Then go to localhost:8080, which renders demo/index.html.
