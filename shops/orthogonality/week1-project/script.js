const pruducts = [
  {
    "id": 1,
    "title": "ذهن‌های پراکنده",
    "author": "گبور مته",
    "priceToman": 185000,
    "imageUrl": "https://img.taaghche.com/frontCover/243928.jpg",
    "sourceUrl": "https://taaghche.com/book/243928"
  },
  {
    "id": 2,
    "title": "بامداد خمار",
    "author": "فتانه حاج سید جوادی (پروین)",
    "priceToman": "400,000",
    "imageUrl": "https://img.taaghche.com/frontCover/141438.jpg",
    "sourceUrl": "https://taaghche.com/book/141438"
  },
  {
    "id": 3,
    "title": "من ادواردو نیستم!",
    "author": "گروه نویسندگان",
    "priceToman": "10,000",
    "imageUrl": "https://img.taaghche.com/frontCover/40284.jpg",
    "sourceUrl": "https://taaghche.com/book/40284"
  },
  {
    "id": 4,
    "title": "معجزه شکرگزاری",
    "author": "راندا برن",
    "priceToman": '39,900',
    "imageUrl": "https://img.taaghche.com/frontCover/97532.jpg",
    "sourceUrl": "https://taaghche.com/book/97532"
  },
  {
    "id": 6,
    "title": "بوف کور",
    "author": "صادق هدایت",
    "priceToman": '50,000',
    "imageUrl": "https://img.taaghche.com/frontCover/882.jpg",
    "sourceUrl": "https://taaghche.com/book/882"
  },
  {
    "id": 7,
    "title": "شب‌های روشن",
    "author": "فئودور داستایفسکی",
    "priceToman": '80,000',
    "imageUrl": "https://img.taaghche.com/frontCover/54965.jpg",
    "sourceUrl": "https://taaghche.com/book/54965"
  },
  {
    "id": 8,
    "title": "پسرک، موش کور، روباه و اسب",
    "author": "چارلی مکسی",
    "priceToman": '125,000',
    "imageUrl": "https://img.taaghche.com/frontCover/71446.jpg",
    "sourceUrl": "https://taaghche.com/book/71446"
  },
]
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


const searchBar = document.querySelector(".search");
const searchInput = searchBar.querySelector(".search_box");
searchBar.addEventListener("click", () => {
    searchInput.focus();
});
const container = document.getElementById("container");
const template = document.getElementById("card-template");

    for (const p of pruducts) {
        const card = template.content.cloneNode(true);
        const img = card.querySelector(".book_img");
        img.src = p.imageUrl;


        card.querySelector(".book_title").textContent = p.title;
        card.querySelector(".book_author").textContent = p.author;
        card.querySelector("#priceToman").textContent = p.priceToman;
        
        const btn = card.querySelector(".Add");
        btn.setAttribute("aria-label", `افزودن ${p.title} به سبد خرید`);
        btn.dataset.id = p.id;

  container.appendChild(card); 
}