const categorie_main_container = document.querySelector(".categorie_main_container");
const categorie_main_template = document.querySelector(".categorie_main_template");
console.log("container:", categorie_main_container);
fetch("../../../api/categories.json")
.then((response)=>response.json())
.then((categories)=>{
  console.log(categories);
  for (const c of categories) {
  
    const card = categorie_main_template.content.cloneNode(true);
    card.querySelector(".categorie_main_title").textContent = c.name;  
    card.querySelector(".emoji").textContent = c.emoji;
    card.querySelector(".emoji").style.backgroundColor = c.color;
    categorie_main_container.appendChild(card); 
    
  }
})
  .catch((err) => console.error(err));

const container = document.getElementById("container");
const template = document.getElementById("card-template");
const categoryId = 1;
fetch("../../../api/products.json")
.then((response)=>response.json())
.then((products)=>{
  console.log(products);
   const filtered = products.filter((p) => (p.categoryId) === categoryId);

      for (const p of filtered) {
          const card = template.content.cloneNode(true);
          card.querySelector(".book_title").textContent = p.name;
          card.querySelector("#priceToman").textContent = p.price;  
          container.appendChild(card); 
}
})
.catch((err) => console.error(err));


function toFa(str) {
  return str.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}
document.addEventListener('DOMContentLoaded', () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    node.nodeValue = toFa(node.nodeValue);
  }
});
// 
const searchBar = document.querySelector(".search");
const searchInput = searchBar.querySelector(".search_box");
searchBar.addEventListener("click", () => {
    searchInput.focus();
});

// const container = document.getElementById("container");
// const template = document.getElementById("card-template");

//     for (const p of productS) {
//         const card = template.content.cloneNode(true);
//         card.querySelector(".book_title").textContent = p.name;
//         card.querySelector("#priceToman").textContent = p.price;
        
//   container.appendChild(card); 
// }
