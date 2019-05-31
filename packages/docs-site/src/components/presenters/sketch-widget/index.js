import React from 'react'
import PropTypes from 'prop-types'

import './sketch-widget.scss'

const SketchWidget = ({ name, url }) => {
  return (
    <article className="sketch-widget">
      <div className="sketch-widget__head">
        <span className="sketch-widget__title">Name in Sketch toolkit</span>

        <a
          className="sketch-widget__link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Sketch toolkit
        </a>
      </div>
      <div className="sketch-widget__body">{name}</div>
    </article>
  )
}

SketchWidget.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}

SketchWidget.defaultProps = {
  name: '-',
  url: '#',
}

export default SketchWidget
