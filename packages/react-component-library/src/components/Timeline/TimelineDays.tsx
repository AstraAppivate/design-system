import React from 'react'
import { format } from 'date-fns'

import { getKey } from './helpers'
import { TimelineContext } from './context'
import { DATE_DAY_FORMAT } from './constants'

export type TimelineDaysProps = ComponentWithClass

export const TimelineDays: React.FC<TimelineDaysProps> = () => {
  return (
    <TimelineContext.Consumer>
      {({ state: { days, options } }) => (
        <div className="timeline__days">
          {days &&
            days.map(({ date }, index) => {
              return (
                <div
                  className="timeline__day"
                  key={getKey('timeline-day', index)}
                  style={{
                    width: `${options.dayWidth}px`,
                  }}
                  data-testid="timeline-day"
                >
                  <span
                    className="timeline__day-title"
                    data-testid="timeline-day-title"
                  >
                    {format(date, DATE_DAY_FORMAT)}
                  </span>
                </div>
              )
            })}
        </div>
      )}
    </TimelineContext.Consumer>
  )
}

TimelineDays.displayName = 'TimelineDays'
