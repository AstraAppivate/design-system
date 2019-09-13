import React, { SVGProps } from 'react'

const SvgLens = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="lens_svg__a"
        d="M8 1.333A6.67 6.67 0 001.333 8 6.67 6.67 0 008 14.667 6.67 6.67 0 0014.667 8 6.67 6.67 0 008 1.333z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="lens_svg__b" fill="#fff">
        <use xlinkHref="#lens_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#lens_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgLens
