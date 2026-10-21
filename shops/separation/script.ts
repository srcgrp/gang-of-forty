// async function getProducts() {
// const response = await fetch("./products.json")
// const javab = await response.json()
// javab[0].
// console.log(javab)
// showProducts(javab)

// }

import { createIcons, Menu, Plus, Search, ShoppingCart } from 'lucide';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const lucideIcons = { Menu, Search, ShoppingCart, Plus }

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

        Swal.fire({
            title: "محصولات لود شد!",
            text: `تعداد ${products.length.toLocaleString('fa-IR')} محصول با موفقیت نمایش داده شد.`,
            icon: "success",
            confirmButtonText: "عالیه",
            confirmButtonColor: "#9b5c70",
        })
    } catch (error) {
        console.error("Fetch error:", error);

        Swal.fire({
            title: "خطا!",
            text: "دریافت محصولات با مشکل مواجه شد.",
            icon: "error",
            confirmButtonText: "باشه",
            confirmButtonColor: "#9b5c70",
        })
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
button.innerHTML = '<i data-lucide="plus"></i>'

card.append(image, title, unit, price, button)
car.appendChild(card)
})

createIcons({ icons: lucideIcons })
}

createIcons({ icons: lucideIcons })

getProducts()
