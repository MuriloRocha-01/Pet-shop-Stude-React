import { products } from "../data/products";
import type { ProductsProps } from "../types/product";

// Antes: axios apontando para o json-server em localhost:3000.
// Agora os dados são locais, o que permite publicar o site só como front-end (ex.: Vercel).
export async function getProducts(): Promise<ProductsProps[]> {
  return products;
}

export async function getProduct(id: string | number | undefined): Promise<ProductsProps | undefined> {
  return products.find((p) => String(p.id) === String(id));
}
