import React, { ReactElement } from 'react'

import { LinkTypes } from '../../common/Link'
import { StyledBreadcrumbsItem } from './partials/StyledBreadcrumbsItem'
import { StyledEndTitle } from './partials/StyledEndTitle'
import { StyledIcon } from './partials/StyledIcon'

export interface BreadcrumbsItemProps {
  /**
   * Denotes whether this is the first item.
   * @private
   */
  isFirst?: boolean
  /**
   * Denotes whether this is the last item.
   * @private
   */
  isLast?: boolean
  /**
   * Link component to use for the item (custom implementation welcome).
   */
  link: React.ReactElement<LinkTypes>
}

function getText(isLast: boolean, link: React.ReactElement<LinkTypes>) {
  if (isLast) {
    return (
      <StyledEndTitle aria-current="page" data-testid="breadcrumb-end-title">
        {(link as ReactElement).props.children}
      </StyledEndTitle>
    )
  }

  return link
}

export const BreadcrumbsItem: React.FC<BreadcrumbsItemProps> = ({
  isFirst,
  isLast,
  link,
  ...rest
}) => {
  return (
    <StyledBreadcrumbsItem data-testid="breadcrumb" {...rest}>
      {!isFirst && (
        <StyledIcon aria-hidden data-testid="breadcrumb-separator" />
      )}

      {getText(isLast, link)}
    </StyledBreadcrumbsItem>
  )
}

BreadcrumbsItem.displayName = 'BreadcrumbsItem'
