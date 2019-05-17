import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import './globals.scss'

const Layout = ({ children, className }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => (
      <div>
        <div className={className}>{children}</div>
      </div>
    )}
  />
)

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  className: '',
}

export default Layout
