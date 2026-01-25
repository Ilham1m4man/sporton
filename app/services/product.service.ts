import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Product } from "../types";

export async function getAllProducts(): Promise<Product[]> {
  return await fetchAPI<Product[]>("/products");
}

export async function getDetailProduct(id: string): Promise<Product> {
  return await fetchAPI<Product>(`/products/${id}`);
}

export async function createProduct(data: FormData): Promise<Product> {
  return await fetchAPI<Product>(`/products`, {
    method: "POST",
    headers: { ...getAuthHeaders() },
    body: data,
  });
}

export async function updateProduct(
  id: string,
  data: FormData,
): Promise<Product> {
  return await fetchAPI<Product>(`/products/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders() },
    body: data,
  });
}

export async function deleteProduct(id: string) {
  return await fetchAPI(`/products/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
}
