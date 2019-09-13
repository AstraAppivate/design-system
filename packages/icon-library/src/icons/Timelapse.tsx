import React, { SVGProps } from 'react'

const SvgTimelapse = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="timelapse_svg__a"
        d="M10.827 5.173A3.983 3.983 0 008 4v4l-2.827 2.827a4.008 4.008 0 005.66 0 3.994 3.994 0 00-.006-5.654zM8 1.333A6.67 6.67 0 001.333 8 6.67 6.67 0 008 14.667 6.67 6.67 0 0014.667 8 6.67 6.67 0 008 1.333zm0 12A5.332 5.332 0 012.667 8 5.332 5.332 0 018 2.667 5.332 5.332 0 0113.333 8 5.332 5.332 0 018 13.333z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="timelapse_svg__b" fill="#fff">
        <use xlinkHref="#timelapse_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#timelapse_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgTimelapse
