import type { ReactNode } from 'react'

type JumpLinkProps = {
  to: string
  className?: string
  label?: string
  children: ReactNode
}

export default function JumpLink({ to, className, label, children }: JumpLinkProps) {
  return (
    <a
      className={className}
      href={`#${to}`}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault()
        const target = document.getElementById(to)
        target?.scrollIntoView()
        target?.focus()
      }}
    >
      {children}
    </a>
  )
}