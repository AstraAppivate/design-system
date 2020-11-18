import React from 'react'
import { isFinite, isNil } from 'lodash'
import { selectors } from '@royalnavy/design-tokens'
import styled, { css } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import { ClearButton } from './ClearButton'
import { EndAdornment } from './EndAdornment'
import { Footnote } from './Footnote'
import { getId, hasClass } from '../../helpers'
import { Input } from './Input'
import { InputValidationProps } from '../../common/InputValidationProps'
import { ComponentWithClass } from '../../common/ComponentWithClass'
import { StartAdornment } from './StartAdornment'
import { useFocus } from '../../hooks/useFocus'
import { useValue } from './useValue'
import { UNIT_POSITION } from './constants'
import {
  getOuterWrapperBorder,
  StyledOuterWrapperProps,
} from '../../styled-components/input'

const { color, spacing } = selectors

export type UnitPosition =
  | typeof UNIT_POSITION.AFTER
  | typeof UNIT_POSITION.BEFORE

export interface NumberInputProps
  extends ComponentWithClass,
    InputValidationProps {
  autoFocus?: boolean
  canClear?: boolean
  footnote?: string
  id?: string
  isCondensed?: boolean
  isDisabled?: boolean
  label?: string
  max?: number
  min?: number
  name: string
  onBlur?: (event: React.FormEvent) => void
  onChange: (event: any) => void
  placeholder?: string
  startAdornment?: React.ReactNode | string
  step?: number
  unit?: string
  unitPosition?: UnitPosition
  value?: number
}

const StyledNumberInput = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin: ${spacing('6')} 0;
  padding: 0;
  border: 0;
  vertical-align: top;
  width: 100%;
`

const StyledNumberInputOuterWrapper = styled.div<StyledOuterWrapperProps>`
  display: inline-flex;
  flex-direction: row;
  background-color: ${color('neutral', 'white')};

  ${(props) => getOuterWrapperBorder(props)}
`

function formatValue(
  displayValue: number,
  unit: string,
  unitPosition: UnitPosition
) {
  if (isNil(displayValue)) {
    return null
  }

  if (unit) {
    return unitPosition === UNIT_POSITION.AFTER
      ? `${displayValue} ${unit}`
      : `${unit} ${displayValue}`
  }

  return displayValue
}

function getNewValue(event: React.FormEvent<HTMLInputElement>): number {
  const { value } = event.currentTarget

  if (value === '') {
    return null
  }

  return parseInt(value, 10)
}

function isWithinRange(max: number, min: number, newValue: number) {
  const isNotBelowMin = isNil(min) || newValue >= min
  const isNotAboveMax = isNil(max) || newValue <= max

  return isNotBelowMin && isNotAboveMax
}

export const NumberInput: React.FC<NumberInputProps> = ({
  canClear,
  className,
  footnote,
  id = uuidv4(),
  isCondensed,
  isDisabled = false,
  isInvalid,
  isValid,
  label,
  max,
  min,
  name,
  onBlur,
  onChange,
  placeholder = '',
  startAdornment,
  step = 1,
  unit,
  unitPosition = UNIT_POSITION.AFTER,
  value = 0,
  ...rest
}) => {
  const { committedValue, setCommittedValue } = useValue(value)
  const { hasFocus, onFocus, onLocalBlur } = useFocus(onBlur)

  function setCommittedValueWithinRange(newValue: number) {
    if (
      (isFinite(newValue) && isWithinRange(max, min, newValue)) ||
      newValue === null
    ) {
      setCommittedValue(newValue)
      onChange({
        target: {
          name,
          value: newValue,
        },
      })
    }
  }

  const numberInputId = getId('number-input')

  return (
    <StyledNumberInput
      aria-label={label || 'Number input'}
      className={className}
      data-testid="number-input-container"
      id={numberInputId}
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={committedValue}
      aria-valuetext={String(formatValue(committedValue, unit, unitPosition))}
    >
      <StyledNumberInputOuterWrapper
        $hasFocus={hasFocus}
        $isInvalid={isInvalid || hasClass(className, 'is-invalid')}
        $isValid={isValid || hasClass(className, 'is-valid')}
      >
        <StartAdornment>{startAdornment}</StartAdornment>

        <Input
          aria-labelledby={numberInputId}
          hasFocus={hasFocus}
          id={id}
          isDisabled={isDisabled}
          isCondensed={isCondensed}
          isValid={isValid || hasClass(className, 'is-valid')}
          isInvalid={isInvalid || hasClass(className, 'is-invalid')}
          label={label}
          name={name}
          onChange={(event) => {
            const newValue = getNewValue(event)
            setCommittedValueWithinRange(newValue)
          }}
          onBlur={(event) => {
            const newValue = getNewValue(event)
            setCommittedValueWithinRange(newValue)

            onLocalBlur(event)
          }}
          onFocus={onFocus}
          placeholder={placeholder}
          unit={unit}
          unitPosition={unitPosition}
          value={committedValue}
          {...rest}
        />

        {canClear && (
          <ClearButton
            isCondensed={isCondensed}
            isDisabled={isDisabled}
            onClick={() => {
              setCommittedValueWithinRange(null)
            }}
          />
        )}

        <EndAdornment
          isCondensed={isCondensed}
          isDisabled={isDisabled}
          max={max}
          min={min}
          name={name}
          onClick={(e, newValue) => {
            setCommittedValueWithinRange(newValue)
          }}
          step={step}
          value={committedValue}
        />
      </StyledNumberInputOuterWrapper>

      <Footnote>{footnote}</Footnote>
    </StyledNumberInput>
  )
}

NumberInput.displayName = 'NumberInput'
