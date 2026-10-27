export type Product = {
  id : number,
  categoryId : number,
  name : string,
  emoji: string,
  unit : string,
  price : number,
  tags : string[]
}
export type Category = {id: number, slug: string,name: string, emoji: string, color : string}
export type Offer = {productId:number , percent: number, label:string}
export type Stock = {updatedAt: string, items: Record<string, number>}
export const API_FILES = ["products", "offers", "stock"] as const
export type ApiFile = (typeof API_FILES)[number]

export type ProductCard = Pick<Product, "emoji" | "name" | "price" | "unit">
export type CartLine = Pick<Product, "id"| "name" | "price">