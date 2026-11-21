import type { Category, Home, Shop } from '../types'

const link = (txt: string, href: string) => {
    const li = document.createElement('li')
    const a = Object.assign(document.createElement('a'), { href, textContent: txt })
    li.appendChild(a)
    return li
}

export function renderCategories(nav: HTMLElement, cats: Category[]): void {
    nav.textContent = ''
    cats.forEach(c => {
        const a = Object.assign(document.createElement('a'), { className: 'category', href: '#' + c.slug })
        const em = Object.assign(document.createElement('span'), { className: 'emoji', textContent: c.emoji })
        em.setAttribute('aria-hidden', 'true')
        Object.assign(em.style, { background: c.color, borderRadius: '50%', padding: '10px' })
        a.append(em, Object.assign(document.createElement('span'), { textContent: c.name }))
        nav.appendChild(a)
    })
}

export function renderMenu(sub: HTMLElement, main: HTMLElement, shop: Shop, cats: Category[]): void {
    sub.textContent = ''
    cats.forEach(c => sub.appendChild(link(c.name, '#' + c.slug)))
    shop.menu.forEach(m => main.appendChild(link(m.label, m.href)))
}

export function renderFooter(
    el: { notice: HTMLElement; about: HTMLElement; address: HTMLElement; phone: HTMLElement; cats: HTMLElement; help: HTMLElement; schedule: HTMLElement },
    shop: Shop, cats: Category[]
): void {
    el.notice.textContent = shop.notice
    el.about.textContent = shop.about
    el.address.textContent = shop.address
    el.phone.textContent = 'تلفن: ' + shop.phone
    el.cats.textContent = el.help.textContent = el.schedule.textContent = ''
    cats.forEach(c => el.cats.appendChild(link(c.name, '#' + c.slug)))
    shop.help.forEach(h => el.help.appendChild(link(h.label, h.href)))
    shop.schedule.forEach(s => {
        el.schedule.appendChild(Object.assign(document.createElement('li'), { textContent: `${s.days}: ${s.time}` }))
    })
}

export function renderPosters(p1: HTMLElement, p2: HTMLElement, home: Home): void {
    p1.textContent = p2.textContent = ''
    const banner = (data: Home['hero'], cls: string) => {
        const a = Object.assign(document.createElement('a'), { className: 'poster ' + cls, href: data.cta.href })
        a.append(
            Object.assign(document.createElement('span'), { textContent: data.emoji }),
            Object.assign(document.createElement('h2'), { textContent: data.title }),
            Object.assign(document.createElement('p'), { textContent: data.text }),
            Object.assign(document.createElement('b'), { textContent: data.cta.label })
        )
        return a
    }
    p1.append(banner(home.hero, 'poster-1'), banner(home.side, 'poster-2'))
    home.promos.forEach((pr, i) => {
        const a = Object.assign(document.createElement('a'), { className: `poster poster-${i + 3}`, href: pr.href })
        a.style.background = pr.color
        a.append(Object.assign(document.createElement('span'), { textContent: pr.emoji }), Object.assign(document.createElement('p'), { textContent: pr.text }))
        p2.appendChild(a)
    })
}