import React, { SVGProps } from 'react'

const SvgComputer = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="computer_svg__a"
        d="M13.333 12c.734 0 1.327-.6 1.327-1.333L14.667 4c0-.733-.6-1.333-1.334-1.333H2.667c-.734 0-1.334.6-1.334 1.333v6.667c0 .733.6 1.333 1.334 1.333H0v1.333h16V12h-2.667zM2.667 4h10.666v6.667H2.667V4z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="computer_svg__b" fill="#fff">
        <use xlinkHref="#computer_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#computer_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgComputer
