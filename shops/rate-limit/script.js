async function loadSnacksProducts() {
  const carouselList = document.querySelector('#snacks .carousel-list');
  if (!carouselList) return;

  carouselList.innerHTML = `
    <div class="skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
    </div>
  `.repeat(4);

  try {
    const response = await fetch('../../api/products.json');    
    if (!response.ok) {
      throw new Error('خطا در دریافت اطلاعات محصولات');
    }

    const products = await response.json();
    const snackProducts = products.filter(item => item.categoryId === 7);

    carouselList.innerHTML = '';

    if (snackProducts.length === 0) {
      carouselList.innerHTML = '<p class="empty-message">محصولی در این دسته یافت نشد.</p>';
      return;
    }

    snackProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'carousel-card-sells';

      const img = document.createElement('div');
      img.className = 'carousel-image-sells';
      img.style.fontSize = '40px';
      img.style.textAlign = 'center';
      img.style.padding = '15px 0';
      img.textContent = product.emoji;
      card.appendChild(img);

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'add-to-cart';
      addBtn.textContent = '+';
      card.appendChild(addBtn);

      const title = document.createElement('h3');
      title.className = 'card-title-sells';
      title.textContent = product.name;
      card.appendChild(title);

      const amountWrap = document.createElement('div');
      amountWrap.className = 'sell-amount-wrap';
      const amountP = document.createElement('p');
      amountP.className = 'sell-amount';
      amountP.textContent = product.unit;
      amountWrap.appendChild(amountP);
      card.appendChild(amountWrap);

      const priceRow = document.createElement('div');
      priceRow.className = 'price-row';

      const priceP = document.createElement('p');
      priceP.className = 'price regular-price';
      const formattedPrice = new Intl.NumberFormat('fa-IR').format(product.price);
      priceP.textContent = `${formattedPrice} تومان`;
      priceRow.appendChild(priceP);

      card.appendChild(priceRow);
      carouselList.appendChild(card);
    });

  } catch (error) {
    carouselList.innerHTML = '<p class="error-message">خطا در بارگذاری اطلاعات. لطفاً اتصال اینترنت خود را بررسی کنید.</p>';
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadSnacksProducts);