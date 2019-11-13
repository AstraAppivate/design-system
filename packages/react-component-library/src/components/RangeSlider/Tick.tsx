import React from 'react'
import { SliderItem } from 'react-compound-slider'

interface TickProps {
  tick: SliderItem
  count: number
  hasLabels?: boolean
}

export const Tick: React.FC<TickProps> = ({ tick, count, hasLabels }) => {
  return (
    <div>
      <div
        className="rn-rangeslider__tick"
        style={{ left: `${tick.percent}%` }}
      />
      {hasLabels && (
        <span
          className="rn-rangeslider__label"
          style={{
            marginLeft: `${-(100 / count) / 2}%`,
            width: `${100 / count}%`,
            left: `${tick.percent}%`,
          }}
        >
          {tick.value}
        </span>
      )}
    </div>
  )
}

Tick.displayName = 'Tick'
