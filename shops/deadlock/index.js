const API = '../../api/'

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
// const toman = (n) => new Intl.NumberFormat('fa-IR').format(n) + 'تومان'
// const $ = (sel) => document.querySelector(sel)

const categories = fetch(API + 'categories.json').then(async(res) => await console.log(res))

console.log(categories)