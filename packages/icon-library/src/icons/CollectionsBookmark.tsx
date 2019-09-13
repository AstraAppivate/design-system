import React, { SVGProps } from 'react'

const SvgCollectionsBookmark = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="collections-bookmark_svg__a"
        d="M2.667 4H1.333v9.333c0 .734.6 1.334 1.334 1.334H12v-1.334H2.667V4zm10.666-2.667h-8C4.6 1.333 4 1.933 4 2.667v8C4 11.4 4.6 12 5.333 12h8c.734 0 1.334-.6 1.334-1.333v-8c0-.734-.6-1.334-1.334-1.334zm0 6.667l-1.666-1L10 8V2.667h3.333V8z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="collections-bookmark_svg__b" fill="#fff">
        <use xlinkHref="#collections-bookmark_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#collections-bookmark_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgCollectionsBookmark
