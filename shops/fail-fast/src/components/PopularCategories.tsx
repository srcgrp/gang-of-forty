import type { ReactNode } from 'react'
import dairyEggsImg from '../images/dairy-eggs.png'
import fruitVegetablesImg from '../images/fruit-vegetables.png'
import breadImg from '../images/bread.png'
import snacksSweetsImg from '../images/snacks-sweets.png'
import drinksImg from '../images/drinks.png'
import cosmeticsImg from '../images/cosmetics.webp'

export default function PopularCategories(): ReactNode {
  return (
    <section className="section" id="categories">
      <h2 className="section-title">دسته‌بندی‌های پرطرفدار</h2>
      <div className="popular-products" tabIndex={0}>
        <article className="popular-products-items">
          <a href="#categories">
            <div className="popular-products-cards">
              <img
                src={dairyEggsImg}
                width="60"
                height="90"
                alt="لبنیات و تخم مرغ"
                loading="lazy"
              />
              <p className="popular-products-tags">لبنیات و تخم‌مرغ</p>
            </div>
          </a>
        </article>
        <article className="popular-products-items">
          <a href="#categories">
            <div className="popular-products-cards">
              <img
                src={fruitVegetablesImg}
                width="60"
                height="90"
                alt="میوه و سبزیجات"
                loading="lazy"
              />
              <p className="popular-products-tags">میوه و سبزیجات</p>
            </div>
          </a>
        </article>
        <article className="popular-products-items">
          <a href="#categories">
            <div className="popular-products-cards">
              <img
                src={breadImg}
                width="60"
                height="90"
                alt="نان و غلات"
                loading="lazy"
              />
              <p className="popular-products-tags">نان و غلات</p>
            </div>
          </a>
        </article>
        <article className="popular-products-items">
          <a href="#categories">
            <div className="popular-products-cards">
              <img
                src={snacksSweetsImg}
                width="60"
                height="90"
                alt="تنقلات و شیرینی"
                loading="lazy"
              />
              <p className="popular-products-tags">تنقلات و شیرینی</p>
            </div>
          </a>
        </article>
        <article className="popular-products-items">
          <a href="#categories">
            <div className="popular-products-cards">
              <img
                src={drinksImg}
                width="60"
                height="90"
                alt="نوشیدنیها"
              />
              <p className="popular-products-tags">نوشیدنیها</p>
            </div>
          </a>
        </article>
        <article className="popular-products-items">
          <a href="#categories">
            <div className="popular-products-cards">
              <img
                src={cosmeticsImg}
                width="60"
                height="90"
                alt="آرایشی و بهداشتی"
              />
              <p className="popular-products-tags">آرایشی و بهداشتی</p>
            </div>
          </a>
        </article>
      </div>
    </section>
  )
}
