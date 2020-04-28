import React from 'react'
import { format, getDaysInMonth } from 'date-fns'

import { getKey } from './helpers'
import { TimelineContext } from './context'
import { DEFAULTS, DATE_MONTH_FORMAT } from './constants'

export type TimelineMonthsProps = ComponentWithClass

export const TimelineMonths: React.FC<TimelineMonthsProps> = () => {
  return (
    <TimelineContext.Consumer>
      {({ state: { months } }) => (
        <div className="timeline__months">
          {months &&
            months.map(({ startDate }, index) => {
              const days = getDaysInMonth(startDate)

              return (
                <div
                  className="timeline__month"
                  key={getKey('timeline-month', index)}
                  style={{
                    width: `${days * DEFAULTS.DAY_WIDTH}px`,
                  }}
                  data-testid="timeline-month"
                >
                  <span
                    className="timeline__month-title"
                    data-testid="timeline-month-title"
                  >
                    {format(startDate, DATE_MONTH_FORMAT)}
                  </span>
                </div>
              )
            })}
        </div>
      )}
    </TimelineContext.Consumer>
  )
}

TimelineMonths.displayName = 'TimelineMonths'
