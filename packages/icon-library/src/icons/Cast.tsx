import React, { SVGProps } from 'react'

const SvgCast = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="cast_svg__a"
        d="M14 2H2C1.267 2 .667 2.6.667 3.333v2H2v-2h12v9.334H9.333V14H14c.733 0 1.333-.6 1.333-1.333V3.333C15.333 2.6 14.733 2 14 2zM.667 12v2h2c0-1.107-.894-2-2-2zm0-2.667v1.334A3.335 3.335 0 014 14h1.333A4.663 4.663 0 00.667 9.333zm0-2.666V8a6 6 0 016 6H8A7.333 7.333 0 00.667 6.667z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="cast_svg__b" fill="#fff">
        <use xlinkHref="#cast_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#cast_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgCast
