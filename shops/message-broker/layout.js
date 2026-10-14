const LAYOUT_BASE = '../../api/'

async function loadLayoutJSON(name) {
    const res = await fetch(LAYOUT_BASE + name)
    if (!res.ok) {
        throw new Error(name + ': HTTP ' + res.status)
    }
    return res.json()
}

function makeLink(text, href) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = href
    a.textContent = text
    li.appendChild(a)
    return li
}

function renderCategories(categories) {
    const nav = document.getElementById('categories')
    nav.textContent = ''

    categories.forEach(c => {
        const a = document.createElement('a')
        a.className = 'category'
        a.href = '#' + c.slug

        const emoji = document.createElement('span')
        emoji.className = 'emoji'
        emoji.setAttribute('aria-hidden', 'true')
        emoji.textContent = c.emoji
        emoji.style.background = c.color
        emoji.style.borderRadius = '50%'
        emoji.style.padding = '10px'

        const name = document.createElement('span')
        name.textContent = c.name

        a.append(emoji, name)
        nav.appendChild(a)
    })
}

function renderMenu(shop, categories) {
    const sub = document.getElementById('submenu')
    sub.textContent = ''
    categories.forEach(c => sub.appendChild(makeLink(c.name, '#' + c.slug)))

    const menu = document.getElementById('main-menu')
    shop.menu.forEach(m => menu.appendChild(makeLink(m.label, m.href)))
}

function renderFooter(shop, categories) {
    document.getElementById('notice').textContent = shop.notice
    document.getElementById('about').textContent = shop.about
    document.getElementById('address').textContent = shop.address
    document.getElementById('phone').textContent = 'تلفن: ' + shop.phone
      
    const cats = document.getElementById('footer-categories')
    categories.forEach(c => cats.appendChild(makeLink(c.name, '#' + c.slug)))

    const help = document.getElementById('footer-help')
    shop.help.forEach(h => help.appendChild(makeLink(h.label, h.href)))

    const schedule = document.getElementById('schedule')
    shop.schedule.forEach(s => {
        const li = document.createElement('li')
        li.textContent = s.days + ': ' + s.time
        schedule.appendChild(li)
    })
}

function renderPosters(home) {
    const box = document.getElementById('posters')
    box.textContent = ''

    function makeBanner(data, className) {
        const a = document.createElement('a')
        a.className = 'poster ' + className
        a.href = data.cta.href

        const emoji = document.createElement('span')
        emoji.textContent = data.emoji

        const title = document.createElement('h2')
        title.textContent = data.title

        const text = document.createElement('p')
        text.textContent = data.text

        const cta = document.createElement('b')
        cta.textContent = data.cta.label

        a.append(emoji, title, text, cta)
        return a
    }

    box.appendChild(makeBanner(home.hero, 'poster-1'))
    box.appendChild(makeBanner(home.side, 'poster-2'))

    home.promos.forEach((p, i) => {
        const a = document.createElement('a')
        a.className = 'poster poster-' + (i + 3)
        a.href = p.href
        a.style.background = p.color

        const emoji = document.createElement('span')
        emoji.textContent = p.emoji

        const text = document.createElement('p')
        text.textContent = p.text

        a.append(emoji, text)
        box.appendChild(a)
    })
}


 async function initLayout() {
    try {
        const [categories, shop, home] = await Promise.all([
            loadLayoutJSON('categories.json'),
            loadLayoutJSON('shop.json'),
            loadLayoutJSON('home.json')
        ])

        renderCategories(categories)
        renderMenu(shop, categories)
        renderFooter(shop, categories)
        renderPosters(home)

        if (location.hash) {
            document.getElementById(location.hash.slice(1))?.scrollIntoView()
        }
    } catch (err) {
        console.error(err)
        const nav = document.getElementById('categories')
        nav.textContent = 'خطا: ' + err.message
    }
}

initLayout()