import type { ReactNode } from 'react'

export type IconName = 'search' | 'cart' | 'menu' | 'close' | 'grid' | 'arrow-up'

const SHAPES: Record<IconName, ReactNode> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>),
  cart: (<><path d="M3 9h18l-2 10a2 2 0 0 1-2 1.6H7a2 2 0 0 1-2-1.6z" /><path d="M8 9l3-5M16 9l-3-5" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  'arrow-up': <path d="M12 19V5M6 11l6-6 6 6" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
}

type IconProps = { name: IconName; className?: string }

export default function Icon({ name, className = '' }: IconProps) {
  return (
    <svg className={`icon ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {SHAPES[name]}
    </svg>
  )
}
