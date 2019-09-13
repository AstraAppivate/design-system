import React, { SVGProps } from 'react'

const SvgSlideshow = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="slideshow_svg__a"
        d="M6.667 5.333v5.334L10 8 6.667 5.333zm6-3.333H3.333C2.6 2 2 2.6 2 3.333v9.334C2 13.4 2.6 14 3.333 14h9.334C13.4 14 14 13.4 14 12.667V3.333C14 2.6 13.4 2 12.667 2zm0 10.667H3.333V3.333h9.334v9.334z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="slideshow_svg__b" fill="#fff">
        <use xlinkHref="#slideshow_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#slideshow_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgSlideshow
