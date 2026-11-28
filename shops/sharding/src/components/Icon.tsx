import type { SVGProps } from 'react'

const icons = {
  menu: <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />,
  clock: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </g>
  ),
  grid: <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />,
  search: <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />,
  cart: <path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM1 2v2h2l3.6 7.59-1.35 2.45A1.96 1.96 0 0 0 5 15a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63h7.45a2 2 0 0 0 1.75-1.03l3.58-6.49A1 1 0 0 0 19.88 4H5.21l-.94-2H1zm16 16a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />,
  receipt: <path fillRule="evenodd" d="M5 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v20l-3.5-2-3.5 2-3.5-2L5 23V3zm3 3v2h8V6H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z" />,
  plus: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
  arrowRight: <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />,
  arrowLeft: <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />,
  arrowForward: <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />,
  themeAuto: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </g>
  ),
  themeLight: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
    </g>
  ),
  themeDark: (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </g>
  ),
}

export type IconName = keyof typeof icons

type IconProps = Pick<SVGProps<SVGSVGElement>, 'className' | 'width' | 'height' | 'fill'> & {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}
