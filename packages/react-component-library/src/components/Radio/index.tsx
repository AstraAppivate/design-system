import React from 'react'
import uuid from 'uuid'

import FieldProps from '../../types/FieldProps'
import FormProps from '../../types/FormProps'

interface RadioProps {
  className?: string
  id?: string
  label: string
  disabled?: boolean
  field: FieldProps
  form: FormProps
}

const Radio: React.FC<RadioProps> = ({
  className = '',
  id = uuid(),
  label,
  disabled = false,
  field: { value, name, onChange, onBlur },
  form: { errors = {}, touched = {} },
  ...rest
}) => {
  const hasError = touched[name] && errors[name]

  const classes = `rn-radio
    ${hasError ? 'rn-radio--is-invalid' : ''}
    ${className}
  `

  return (
    <div className={classes} data-testid="container">
      <label className="rn-radio__label" htmlFor={id} data-testid="label">
        <input
          id={id}
          className="rn-radio__radio"
          type="radio"
          name={name}
          value={value}
          checked={value === id}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...rest}
          data-testid="radio"
        />
        <span className="rn-radio__checkmark" />
        {label}
      </label>
      {hasError && (
        <div className="rn-radio__invalid-feedback" data-testid="error">
          {errors[name]}
        </div>
      )}
    </div>
  )
}

Radio.displayName = 'Radio'

export default Radio
