import orangeImg from '../../../../assets/products/orange.png'
import bananaImg from '../../../../assets/products/banana.png'
import milkImg from '../../../../assets/products/milk.png'
import paneerImg from '../../../../assets/products/panir-sefid.png'
import mastImg from '../../../../assets/products/mast.png'
import honeyImg from '../../../../assets/products/honey.png'
import fruitCatImg from '../../../../assets/products/fruit-and-vegetables.png'
import dairyCatImg from '../../../../assets/products/Dairy-products.png'
import drinksCatImg from '../../../../assets/products/beverage.png'
import pantryCatImg from '../../../../assets/products/food-products.png'

const IMAGES: Record<number, string> = {
  102: orangeImg,
  103: bananaImg,
  201: milkImg,
  202: paneerImg,
  203: mastImg,
  402: honeyImg,
}

export function imageFor(id: number): string | null {
  return IMAGES[id] ?? null
}

const CATEGORY_IMAGES: Record<string, string> = {
  fruits: fruitCatImg,
  dairy: dairyCatImg,
  drinks: drinksCatImg,
  pantry: pantryCatImg,
}

export function categoryImageFor(slug: string): string | null {
  return CATEGORY_IMAGES[slug] ?? null
}