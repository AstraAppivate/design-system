import React from 'react'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import { getKey } from '../../helpers'
import { StyledWeeks } from './partials/StyledWeeks'
import { TimelineContext } from './context'
import { TimelineHeaderRow } from './TimelineHeaderRow'
import { TimelineWeek } from './TimelineWeek'

export interface TimelineWeeksWithRenderContentProps
  extends ComponentWithClass {
  render: (
    index: number,
    isOddNumber: boolean,
    offsetPx: string,
    widthPx: string,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => React.ReactElement
}

export interface TimelineWeeksWithChildrenProps extends ComponentWithClass {
  render?: never
}

export type TimelineWeeksProps =
  | TimelineWeeksWithRenderContentProps
  | TimelineWeeksWithChildrenProps

export const TimelineWeeks: React.FC<TimelineWeeksProps> = ({
  render,
  ...rest
}) => {
  return (
    <TimelineContext.Consumer>
      {({
        state: {
          days,
          weeks,
          options: { dayWidth },
        },
      }) => (
        <TimelineHeaderRow
          className="timeline__weeks"
          isShort
          name="Weeks"
          data-testid="timeline-weeks"
          {...rest}
        >
          <StyledWeeks>
            {weeks.map(({ startDate }, index) => (
              <TimelineWeek
                days={days}
                dayWidth={dayWidth}
                index={index}
                key={getKey('timeline-week', startDate.toString())}
                render={render}
                startDate={startDate}
              />
            ))}
          </StyledWeeks>
        </TimelineHeaderRow>
      )}
    </TimelineContext.Consumer>
  )
}

TimelineWeeks.displayName = 'TimelineWeeks'
