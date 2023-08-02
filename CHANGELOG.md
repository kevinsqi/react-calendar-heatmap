## v1.9.1 (2023-08-02)

- Add weekStartDay prop
- Add option to display weekly summaries

## v1.9.0 (2022-06-26)

- Add React 17 and 18 to allowed peerDependencies

## v1.8.1 (2019-08-01)

- Implement getRange without using Array.from (not supported by IE)

## v1.8.0 (2018-11-28)

- Remove usage of componentWillReceiveProps (thanks @anajavi!)

## v1.7.0 (2018-09-09)

- Add script to run prettier on src files, and run it [#90]
- Update build process and demo, and allow importing styles from dist [#89]
- Upgrade dependencies [#68]
- Fix tooltips in demo page (thanks @kaacun!)

## v1.6.3

- Fix occurences where startDate & endDate were not properly converted (thanks @kenkoooo!)

## v1.6.2

- Use latest props when updating value cache (thanks @gitname!)
- Add cross-env so builds work on Windows (thanks @gitname!)
- Expand test coverage (thanks @gitname!)

## v1.6.1

- Make prop-types a dependency, not a devDependency

## v1.6.0

- Add css class name hooks to most inner html elements (thanks @andreysaleba!)

## v1.5.0

- Add startDate prop & deprecate numDays prop (thanks @andreysaleba!)

## v1.4.1

- Allow React 16 as a peerDependency

## v1.4.0

- Add weekday label display (thanks @andreysaleba!)
- Add title element to tooltip (thanks @andreysaleba!)
- Add onMouseLeave, onMouseOver props (thanks @andreysaleba!)

## v1.3.0

- Allow customizeable month strings (thanks @otakustay!)

## v1.2.1

- Update React to `v15.6.1` & add `prop-types` package (thanks @easingthemes!)

## v1.2.0

- Add transformDayElement prop to improve flexibility (thanks @otakustay!)

## v1.1.0

- Allow tooltipDataAttrs to be a function rather than an object (thanks @RSO!)

## v1.0.0

- Improve tooltip support with tooltipDataAttrs prop, allowing usage of e.g. bootstrap tooltips
- titleForValue now sets a square's title attribute instead of setting svg `<title>` element

## v0.4.3

- Build configuration updates

## v0.4.2

- Allow endDate to be string/milliseconds
- Don't show titles by default

## v0.4.1

- Fix broken package issue
- Stop loading CSS through webpack

## v0.4.0

- Add `horizontal` prop, which allows switching between horizontal and vertical orientations
