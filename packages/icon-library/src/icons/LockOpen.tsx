import React, { SVGProps } from 'react'

const SvgLockOpen = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="lock-open_svg__a"
        d="M8 11.333c.733 0 1.333-.6 1.333-1.333S8.733 8.667 8 8.667s-1.333.6-1.333 1.333.6 1.333 1.333 1.333zm4-6h-.667V4a3.335 3.335 0 00-6.666 0h1.266c0-1.14.927-2.067 2.067-2.067 1.14 0 2.067.927 2.067 2.067v1.333H4c-.733 0-1.333.6-1.333 1.334v6.666c0 .734.6 1.334 1.333 1.334h8c.733 0 1.333-.6 1.333-1.334V6.667c0-.734-.6-1.334-1.333-1.334zm0 8H4V6.667h8v6.666z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="lock-open_svg__b" fill="#fff">
        <use xlinkHref="#lock-open_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#lock-open_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgLockOpen
