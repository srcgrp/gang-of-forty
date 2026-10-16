async function getProducts() {
const response = await fetch("../../api/products.json")
const javab = await response.json()
console.log(javab)
showProducts(javab)

}

function showProducts(products) {
const car = document.querySelector('#deal .car')
if (!car) return

car.innerHTML = ''

products.forEach(function (product, index) {
const card = document.createElement('article')
card.className = 'product-card'
card.id = 'deal-' + (index + 1)

const image = document.createElement('div')
image.className = 'product-image'
image.textContent = product.emoji

const title = document.createElement('h3')
title.textContent = product.name

const unit = document.createElement('p')
unit.textContent = product.unit

const price = document.createElement('p')
price.textContent = product.price.toLocaleString('fa-IR') + ' تومان'

const button = document.createElement('button')
button.type = 'button'
button.textContent = '+'

card.append(image, title, unit, price, button)
car.appendChild(card)
})
}

getProducts()