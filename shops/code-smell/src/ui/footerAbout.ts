import type { Shop } from "../types"

export function createFooterAbout(
    currentShop: Shop,
    shopName: string
): HTMLElement {
    const about = document.createElement("section")
    about.className = "footer-column"
    about.setAttribute("aria-labelledby", "footer-about-title")
    const heading = document.createElement("h2")
    heading.className = "footer-column__title footer-brand"
    heading.textContent = shopName
    heading.id = "footer-about-title"
    about.append(heading)
    const brandLogo = document.querySelector<SVGSVGElement>(".brand__logo")

    if (brandLogo) {
        const logo = brandLogo.cloneNode(true)

        if (logo instanceof SVGSVGElement) {
            logo.removeAttribute("aria-labelledby")
            logo.removeAttribute("role")
            logo.setAttribute("aria-hidden", "true")

            const logoTitle = logo.querySelector<SVGTitleElement>("title")

            if (logoTitle) {
                logoTitle.remove()
            }

            logo.classList.replace("brand__logo", "footer-brand__logo")
            heading.prepend(logo)
        }
    }
    const footerColumnText = document.createElement("p")
    footerColumnText.className = "footer-column__text"
    footerColumnText.textContent = currentShop.about
    about.append(footerColumnText)
    const address = document.createElement("address")
    address.className = "footer-contact"
    const locationRow = document.createElement("p")
    locationRow.className = "footer-contact__item"
    const locationIcon = document.createElement("img")
    locationIcon.className = "footer-icon"
    locationIcon.src = "svg/map-pin.svg"
    locationIcon.alt = ""
    locationIcon.width = 18
    locationIcon.height = 18
    locationIcon.setAttribute("aria-hidden", "true")
    locationRow.append(locationIcon, document.createTextNode(currentShop.address))
    const phoneRow = document.createElement("p")
    phoneRow.className = "footer-contact__item"
    const phoneLink = document.createElement("a")
    phoneLink.className = "footer-contact__link"
    phoneLink.textContent = currentShop.phone.replaceAll("-", "‑")
    phoneLink.href = "tel:" + currentShop.phone.replaceAll("-", "")
    phoneLink.dir = "ltr"
    const phoneIcon = document.createElement("img")
    phoneIcon.className = "footer-icon"
    phoneIcon.src = "svg/phone.svg"
    phoneIcon.alt = ""
    phoneIcon.width = 18
    phoneIcon.height = 18
    phoneIcon.setAttribute("aria-hidden", "true")
    phoneRow.append(phoneIcon, phoneLink)
    address.append(locationRow, phoneRow)
    about.append(address)
    return about
}