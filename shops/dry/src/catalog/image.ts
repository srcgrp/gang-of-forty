import orangeImg from '../../assets/products/orange.png'
import bananaImg from '../../assets/products/banana.png'
import milkImg from '../../assets/products/milk.png'
import paneerImg from '../../assets/products/panir-sefid.png'
import mastImg from '../../assets/products/mast.png'
import honeyImg from '../../assets/products/honey.png'

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