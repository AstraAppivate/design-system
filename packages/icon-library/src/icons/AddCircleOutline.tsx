import React, { SVGProps } from 'react'

const SvgAddCircleOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="add-circle-outline_svg__a"
        d="M8.667 4.667H7.333v2.666H4.667v1.334h2.666v2.666h1.334V8.667h2.666V7.333H8.667V4.667zM8 1.333A6.67 6.67 0 001.333 8 6.67 6.67 0 008 14.667 6.67 6.67 0 0014.667 8 6.67 6.67 0 008 1.333zm0 12A5.34 5.34 0 012.667 8 5.34 5.34 0 018 2.667 5.34 5.34 0 0113.333 8 5.34 5.34 0 018 13.333z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="add-circle-outline_svg__b" fill="#fff">
        <use xlinkHref="#add-circle-outline_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#add-circle-outline_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgAddCircleOutline
