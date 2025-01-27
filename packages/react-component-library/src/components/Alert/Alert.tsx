import React from 'react'
import {
  IconInfo,
  IconError,
  IconCheckCircle,
  IconWarning,
} from '@royalnavy/icon-library'

import { ALERT_VARIANT } from './constants'
import { getId } from '../../helpers'
import { useOpenClose } from '../../hooks'
import { StyledAlert } from './partials/StyledAlert'
import { StyledIcon } from './partials/StyledIcon'
import { StyledContent } from './partials/StyledContent'
import { StyledTitle } from './partials/StyledTitle'
import { StyledDescription } from './partials/StyledDescription'
import { StyledFooter } from './partials/StyledFooter'
import { StyledCloseButton } from './partials/StyledCloseButton'

const VARIANT_ICON_MAP = {
  [ALERT_VARIANT.DANGER]: (
    <IconError data-testid={`icon-${ALERT_VARIANT.DANGER}`} />
  ),
  [ALERT_VARIANT.INFO]: <IconInfo data-testid={`icon-${ALERT_VARIANT.INFO}`} />,
  [ALERT_VARIANT.SUCCESS]: (
    <IconCheckCircle data-testid={`icon-${ALERT_VARIANT.SUCCESS}`} />
  ),
  [ALERT_VARIANT.WARNING]: (
    <IconWarning data-testid={`icon-${ALERT_VARIANT.WARNING}`} />
  ),
}

export type AlertVariantType =
  | typeof ALERT_VARIANT.DANGER
  | typeof ALERT_VARIANT.INFO
  | typeof ALERT_VARIANT.SUCCESS
  | typeof ALERT_VARIANT.WARNING

export interface AlertProps {
  /**
   * Description text to display under the component title.
   */
  children: string
  /**
   * Optional handler to be invoked when the component is closed.
   */
  onClose?: (event: React.FormEvent<HTMLButtonElement>) => void
  /**
   * Optional title to display above the description text.
   */
  title?: string
  /**
   * Type of component to display (style varies accordingly).
   */
  variant?: AlertVariantType
}

export const Alert: React.FC<AlertProps> = ({
  children,
  onClose,
  title,
  variant = ALERT_VARIANT.INFO,
  ...rest
}) => {
  const { open, handleOnClose } = useOpenClose(true, onClose)

  const titleId = title ? getId('alert-title') : null
  const descriptionId = getId('alert-description')

  return (
    open && (
      <StyledAlert
        $variant={variant}
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        data-testid="alert"
        role="alert"
        {...rest}
      >
        <StyledIcon
          $variant={variant}
          aria-hidden="true"
          data-testid="state-icon"
        >
          {VARIANT_ICON_MAP[variant]}
        </StyledIcon>
        <StyledContent data-testid="content">
          {title && (
            <StyledTitle
              $variant={variant}
              data-testid="content-title"
              id={titleId}
            >
              {title}
            </StyledTitle>
          )}
          <StyledDescription
            data-testid="content-description"
            id={descriptionId}
          >
            {children}
          </StyledDescription>
          <StyledFooter>
            <StyledCloseButton onClick={handleOnClose} data-testid="close">
              Dismiss
            </StyledCloseButton>
          </StyledFooter>
        </StyledContent>
      </StyledAlert>
    )
  )
}
