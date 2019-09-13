import React, { SVGProps } from 'react'

const SvgExitToApp = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="exit-to-app_svg__a"
        d="M6.727 10.393l.94.94L11 8 7.667 4.667l-.94.94 1.72 1.726H2v1.334h6.447l-1.72 1.726zM12.667 2H3.333C2.593 2 2 2.6 2 3.333V6h1.333V3.333h9.334v9.334H3.333V10H2v2.667C2 13.4 2.593 14 3.333 14h9.334C13.4 14 14 13.4 14 12.667V3.333C14 2.6 13.4 2 12.667 2z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="exit-to-app_svg__b" fill="#fff">
        <use xlinkHref="#exit-to-app_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#exit-to-app_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgExitToApp
