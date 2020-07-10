import React from 'react'
import classNames from 'classnames'

import { TOOLTIP_POSITION } from '.'
import { getId } from '../../helpers'

export interface TooltipProps extends PositionType {
  children: React.ReactNode
  id?: string
  position?:
    | typeof TOOLTIP_POSITION.ABOVE
    | typeof TOOLTIP_POSITION.BELOW
    | typeof TOOLTIP_POSITION.LEFT
    | typeof TOOLTIP_POSITION.RIGHT
  title?: string
  width?: number
}

export const Tooltip: React.FC<TooltipProps> = ({
  bottom,
  children,
  id,
  left,
  position = TOOLTIP_POSITION.ABOVE,
  right,
  title,
  top,
  width,
}) => {
  const style = {
    bottom,
    left,
    right,
    top,
    width,
  }

  const classes = classNames(['rn-tooltip', `rn-tooltip--${position}`])

  const contentId = getId('tooltip-content')
  const titleId = title ? getId('tooltip-title') : null

  return (
    <div
      aria-describedby={contentId}
      aria-labelledby={titleId}
      className={classes}
      data-testid="tooltip"
      id={id}
      role="tooltip"
      style={style}
    >
      <div className="rn-tooltip__content">
        {title && (
          <div className="rn-tooltip__title" id={titleId}>
            {title}
          </div>
        )}
        <div
          className="rn-tooltip__message"
          data-testid="tooltip-content"
          id={contentId}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
