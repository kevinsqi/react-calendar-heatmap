# React Calendar Heatmap

A calendar heatmap component built on SVG, inspired by github's contribution graph. The SVG expands to size of container and colors are configurable.

![react-calendar-heatmap screenshot](/assets/react-calendar-heatmap.png?raw=true)

## Usage

Install the npm module:

```
npm install react-calendar-heatmap
```

Import the component:

```
import CalendarHeatmap from 'react-calendar-heatmap';
```

To show a heatmap of the last 100 days, ending on April 1st:

```javascript
<CalendarHeatmap
  endDate={new Date('2016-04-01')}
  numDays={100}
  values={[
    { date: new Date('2016-01-01'), count: 6 },
    { date: new Date('2016-01-22'), count: 2 },
    ...
    { date: new Date('2016-03-30'), count: 19 }
  ]}
/>
```

## Configuring colors and styles

You can copy CSS from `demo/index.css` and configure it as needed. If you want to map values to colors in a different way, override the `classForValue` prop, which determines which CSS class to apply to each value.

```javascript
<CalendarHeatmap
  ...
  values={[
    { date: new Date('2016-01-01'), state: 'good' },
    { date: new Date('2016-01-05'), state: 'bad' }
  ]}
  classForValue={
    (value) => {
      if (value.state === 'good') {
        return 'green';
      } elsif (value.state === 'bad') {
        return 'red';
      }
      return 'gray';
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

## Development

To view demo locally:

```bash
npm install
npm start
```

Then go to localhost:8080 to see demo.
