export const safeHref = (value: string): string => /^#[a-z][a-z0-9-]*$/i.test(value) ? value : '#contact';

type AnchorEvent = { preventDefault: () => void }

export const anchorClick = (href: string) => (event: AnchorEvent): void => {
  if (!href.startsWith('#')) {
    return
  }
  event.preventDefault()
  const id = href.slice(1)
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.hash = '#/'
  }
}