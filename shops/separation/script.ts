// async function getProducts() {
// const response = await fetch("./products.json")
// const javab = await response.json()
// javab[0].
// console.log(javab)
// showProducts(javab)

// }


async function getProducts(): Promise<void> {
    try {
        const res = await fetch("./products.json");

        console.log("Status:", res.status);
        console.log("URL:", res.url);

        const text = await res.text();
        console.log("Response:", text);

        const products: Products[] = JSON.parse(text);
        console.log("Products:", products[0].price);
        
        showProducts(products)
    } catch (error) {
        console.error("Fetch error:", error);
    }
    

}

type Products = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

function showProducts(products:Products[]) {
const car = document.querySelector('#deal .car')
if (!car) return

car.innerHTML = ''

products.forEach(function (product:Products, index:number) {
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



// getAllNames();
