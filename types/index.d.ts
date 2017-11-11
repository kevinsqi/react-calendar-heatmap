/// <reference types="react" />
import * as React from "react"

export interface Props {
  values: any[]
  numDays?: number
  endDate?: string | number | Date
  gutterSize?: number
  horizontal?: boolean
  showMonthLabels?: boolean
  showOutOfRangeDays?: boolean
  tooltipDataAttrs?: Object | Function
  titleForValue?: Function
  classForValue?: Function
  monthLabels?: string[]
  onClick?: Function
  transformDayElement?: Function
}

export default class CalendarHeatmap extends React.Component<Props, any> {
  render(): JSX.Element
}
