import { CATEGORIES, PRODUCTS } from "./products";

export async function getCatalog() {
  return { categories: CATEGORIES, products: PRODUCTS, source: "local" };
}