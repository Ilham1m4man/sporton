import { fetchAPI } from "../lib/api";
import { Product } from "../types";

export async function getAllProducts(): Promise<Product[]> {
    return await fetchAPI<Product[]>("/products")
}

export async function getDetailProduct(id: string): Promise<Product> {
    return await fetchAPI<Product>(`/products/${id}`)
}