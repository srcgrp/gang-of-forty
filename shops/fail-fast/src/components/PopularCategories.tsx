import type { ReactNode } from 'react'
import dairyEggsImg from '../images/dairy-eggs.png'
import fruitVegetablesImg from '../images/fruit-vegetables.png'
import breadImg from '../images/bread.png'
import snacksSweetsImg from '../images/snacks-sweets.png'
import drinksImg from '../images/drinks.png'
import cosmeticsImg from '../images/cosmetics.webp'
import CategoryCard from './CategoryCard'

export default function PopularCategories(): ReactNode {
  return (
    <section className="section" id="categories">
      <h2 className="section-title">دسته‌بندی‌های پرطرفدار</h2>
      <div className="popular-products" tabIndex={0}>
        <CategoryCard
          href="#categories"
          imgSrc={dairyEggsImg}
          alt="لبنیات و تخم مرغ"
          label="لبنیات و تخم‌مرغ"
        />
        <CategoryCard
          href="#categories"
          imgSrc={fruitVegetablesImg}
          alt="میوه و سبزیجات"
          label="میوه و سبزیجات"
        />
        <CategoryCard
          href="#categories"
          imgSrc={breadImg}
          alt="نان و غلات"
          label="نان و غلات"
        />
        <CategoryCard
          href="#categories"
          imgSrc={snacksSweetsImg}
          alt="تنقلات و شیرینی"
          label="تنقلات و شیرینی"
        />
        <CategoryCard
          href="#categories"
          imgSrc={drinksImg}
          alt="نوشیدنیها"
          label="نوشیدنیها"
          loading="eager"
        />
        <CategoryCard
          href="#categories"
          imgSrc={cosmeticsImg}
          alt="آرایشی و بهداشتی"
          label="آرایشی و بهداشتی"
          loading="eager"
        />
      </div>
    </section>
  )
}
