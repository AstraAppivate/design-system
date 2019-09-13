import React, { SVGProps } from 'react'

const SvgLockOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} {...props}>
    <defs>
      <path
        id="lock-outline_svg__a"
        d="M8 11.333c.733 0 1.333-.6 1.333-1.333S8.733 8.667 8 8.667s-1.333.6-1.333 1.333.6 1.333 1.333 1.333zm4-6h-.667V4a3.335 3.335 0 00-6.666 0v1.333H4c-.733 0-1.333.6-1.333 1.334v6.666c0 .734.6 1.334 1.333 1.334h8c.733 0 1.333-.6 1.333-1.334V6.667c0-.734-.6-1.334-1.333-1.334zM5.933 4c0-1.14.927-2.067 2.067-2.067 1.14 0 2.067.927 2.067 2.067v1.333H5.933V4zM12 13.333H4V6.667h8v6.666z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="lock-outline_svg__b" fill="#fff">
        <use xlinkHref="#lock-outline_svg__a" />
      </mask>
      <g fill="CurrentColor" mask="url(#lock-outline_svg__b)">
        <path d="M0 0h16v16H0z" />
      </g>
    </g>
  </svg>
)

export default SvgLockOutline
