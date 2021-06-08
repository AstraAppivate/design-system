import { useContext } from 'react'

import { differenceInCalendarDays, isBefore, isAfter } from 'date-fns'

import { TimelineContext } from '../context'
import { formatPx } from '../helpers'

const timeOffset = (date: Date) => (1 / 24) * new Date(date).getHours()

function getWidth(startDate: Date, endDate: Date): number {
  return (
    differenceInCalendarDays(new Date(endDate), new Date(startDate)) -
    timeOffset(startDate) +
    timeOffset(endDate)
  )
}

function getOffset(startDate: Date, timelineStart: Date): number {
  return (
    differenceInCalendarDays(new Date(startDate), new Date(timelineStart)) +
    timeOffset(startDate)
  )
}

export function useTimelinePosition(
  startDate: Date,
  endDate: Date
): {
  endsAfterEnd: boolean
  endsBeforeStart: boolean
  isAfterEnd: boolean
  isBeforeStart: boolean
  maxWidth: string
  offset: string
  startsAfterEnd: boolean
  startsBeforeStart: boolean
  width: string
} {
  const {
    state: { currentScaleOption, days },
  } = useContext(TimelineContext)

  const firstDateDisplayed = days[0].date
  const lastDateDisplayed = days[days.length - 1].date

  const startsBeforeStart = isBefore(new Date(startDate), firstDateDisplayed)
  const startsAfterEnd = isAfter(new Date(startDate), lastDateDisplayed)
  const endsBeforeStart = isBefore(new Date(endDate), firstDateDisplayed)
  const endsAfterEnd = isAfter(new Date(endDate), lastDateDisplayed)

  const width = startsBeforeStart
    ? getWidth(firstDateDisplayed, endDate)
    : getWidth(startDate, endDate)

  const offset = startsBeforeStart
    ? 0
    : getOffset(startDate, firstDateDisplayed)

  const maxWidth =
    startsBeforeStart && endsAfterEnd
      ? getWidth(firstDateDisplayed, lastDateDisplayed) + 1
      : getWidth(startDate, lastDateDisplayed) + 1

  return {
    width: formatPx(currentScaleOption.widths.day, width),
    offset: formatPx(currentScaleOption.widths.day, offset),
    maxWidth: formatPx(currentScaleOption.widths.day, maxWidth),
    startsBeforeStart,
    startsAfterEnd,
    endsBeforeStart,
    endsAfterEnd,
    isBeforeStart: startsBeforeStart,
    isAfterEnd: startsAfterEnd,
  }
}
