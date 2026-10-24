function formatPrice(price) {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-cart';

  const imgBox = document.createElement('div');
  imgBox.className = 'img';

  const emoji = document.createElement('span');
  emoji.className = 'img-product';
  emoji.style.fontSize = '4rem';
  emoji.style.display = 'grid';
  emoji.style.placeItems = 'center';
  emoji.textContent = product.emoji || '📦';

  imgBox.appendChild(emoji);

  const details = document.createElement('div');
  details.className = 'product-details';

  const title = document.createElement('p');
  title.className = 'product-description';
  title.textContent = product.name;

  details.appendChild(title);
  const unit = document.createElement('span');
  unit.className = 'product-unit';
  unit.textContent = product.unit || '';
  details.appendChild(unit);

  const cardBtn = document.createElement('div');
  cardBtn.className = 'card-btn';

  const priceLabel = document.createElement('p');
  priceLabel.className = 'price-label';
  priceLabel.textContent = formatPrice(product.price);

  const buyBtn = document.createElement('button');
  buyBtn.className = 'buynow-btn';
  buyBtn.setAttribute('type', 'button');
  buyBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
  buyBtn.textContent = '+';

  cardBtn.appendChild(priceLabel);
  cardBtn.appendChild(buyBtn);

  card.appendChild(imgBox);
  card.appendChild(details);
  card.appendChild(cardBtn);

  return card;
}








async function loadProducts() {
  const carousel = document.getElementById('discounted-carousel');
  const loadingText = carousel.querySelector('.loading-state');
  const errorText = carousel.querySelector('.error-state');

  try {
    const response = await fetch('../../api/products.json');

    if (!response.ok) {
      throw new Error('مشکل در دریافت داده‌ها از سرور');
    }

    const products = await response.json();

    const dairyProducts = products.filter((product) => product.categoryId === 7);

    if (loadingText) {
      loadingText.remove();
    }

    dairyProducts.forEach((product) => {
      const card = createProductCard(product);
      carousel.appendChild(card);
    });

  } catch (error) {
    console.error('خطا:', error);
    if (loadingText) {
      loadingText.remove();
    }
    if (errorText) {
      errorText.hidden = false;
    }
  }
}

loadProducts();
