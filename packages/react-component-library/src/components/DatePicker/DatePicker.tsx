import React, { useState, useRef } from 'react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { format } from 'date-fns'
import TetherComponent from 'react-tether'
import DayPicker, {
  DateUtils,
  RangeModifier,
  DayPickerProps,
  DayModifiers,
} from 'react-day-picker'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import { DATE_FORMAT } from '../../constants'
import { DatePickerInput } from './DatePickerInput'
import { useOpenClose } from './useOpenClose'
import { DATEPICKER_PLACEMENT, DATEPICKER_PLACEMENTS } from '.'
import { FloatingBox, FLOATING_BOX_SCHEME } from '../../primitives/FloatingBox'
import { getId } from '../../helpers'

export interface StateObject {
  from?: Date
  to?: Date
}

export interface DatePickerProps extends ComponentWithClass {
  endDate?: Date
  id?: string
  isDisabled?: boolean
  isRange?: boolean
  label?: string
  name?: string
  onBlur?: (event: React.FormEvent) => void
  onChange?: (data: { startDate: Date; endDate: Date }) => void
  placement?:
    | typeof DATEPICKER_PLACEMENT.ABOVE
    | typeof DATEPICKER_PLACEMENT.BELOW
    | typeof DATEPICKER_PLACEMENT.LEFT
    | typeof DATEPICKER_PLACEMENT.RIGHT
  startDate?: Date
  value?: string
  isOpen?: boolean
  disabledDays?: DayPickerProps['disabledDays']
  initialMonth?: DayPickerProps['initialMonth']
}

function transformDates(startDate: Date, endDate: Date) {
  if (startDate && endDate && differenceInMinutes(endDate, startDate) > 0) {
    return `${format(startDate, DATE_FORMAT.SHORT)} - ${format(
      endDate,
      DATE_FORMAT.SHORT
    )}`
  }

  if (startDate) {
    return format(startDate, DATE_FORMAT.SHORT)
  }

  return ''
}

function getNewState(
  isRange: boolean,
  day: Date,
  state: StateObject
): StateObject {
  if (isRange) {
    if (state.from && (state.to || state.from > day)) {
      return { from: day }
    }

    return DateUtils.addDayToRange(day, state as RangeModifier)
  }

  return { from: day, to: day }
}

export const DatePicker: React.FC<DatePickerProps> = ({
  className,
  endDate,
  id = uuidv4(),
  isDisabled,
  isRange,
  label = 'Select Date',
  name,
  onBlur,
  onChange,
  placement = DATEPICKER_PLACEMENT.BELOW,
  startDate,
  value,
  isOpen,
  disabledDays,
  initialMonth,
}) => {
  const [state, setState] = useState<StateObject>({
    from: startDate,
    to: endDate,
  })

  const { from, to } = state
  const modifiers = { start: from, end: to }

  function handleDayClick(day: Date, { disabled }: DayModifiers) {
    if (disabled) return

    const newState = getNewState(isRange, day, state)
    setState(newState)

    if (onChange) {
      onChange({
        startDate: newState.from,
        endDate: newState.to,
      })
    }
  }

  const componentRef = useRef(null)
  const { openState, onFocus, onClose } = useOpenClose(componentRef, isOpen)
  const hasContent = (value && value.length) || from
  const PLACEMENTS = DATEPICKER_PLACEMENTS[placement]

  const classes = classNames('rn-date-picker', className, {
    'is-open': openState,
    'has-content': hasContent,
    'is-disabled': isDisabled,
  })

  const tetherClasses = classNames('rn-date-picker__tether', {
    'is-visible': openState,
  })

  const floatingBoxClasses = classNames('rn-date-picker__container', {
    'is-visible': openState,
  })

  const gridClasses = classNames('rn-date-picker__grid', {
    'rn-date-picker__grid--range': isRange,
  })

  const titleId = getId('datepicker-title')
  const contentId = getId('day-picker')

  /**
   * Type error in upstream Tether package. Fix submitted.
   * Using createElement allows us to avoid the type error.
   *
   * https://github.com/danreeves/react-tether/issues/218
   * https://github.com/Microsoft/TypeScript/issues/27552
   */
  return (
    <div ref={componentRef} data-testid="datepicker-wrapper">
      {/*
        // @ts-ignore */}
      {React.createElement(TetherComponent, {
        offset: PLACEMENTS.OFFSET,
        attachment: PLACEMENTS.ATTACHMENT,
        targetAttachment: PLACEMENTS.TARGET_ATTACHMENT,
        className: tetherClasses,
        renderTarget: (ref: React.RefObject<HTMLDivElement>) => (
          <DatePickerInput
            ref={ref}
            className={classes}
            dayPickerId={contentId}
            id={id}
            name={name}
            label={label}
            value={transformDates(from, to)}
            onBlur={onBlur}
            onFocus={onFocus}
            isDisabled={isDisabled}
            isOpen={openState}
            onClose={onClose}
          />
        ),
        renderElement: (ref: React.RefObject<HTMLDivElement>) => (
          <FloatingBox
            contentId={contentId}
            ref={ref}
            position={PLACEMENTS.ARROW_POSITION}
            scheme={FLOATING_BOX_SCHEME.LIGHT}
            className={floatingBoxClasses}
            role="dialog"
            aria-modal
            aria-labelledby={titleId}
            aria-live="polite"
          >
            <DayPicker
              className={gridClasses}
              numberOfMonths={isRange ? 2 : 1}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={handleDayClick}
              initialMonth={startDate || initialMonth}
              disabledDays={disabledDays}
            />
          </FloatingBox>
        ),
      })}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'
