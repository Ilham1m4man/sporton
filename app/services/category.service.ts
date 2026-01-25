import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Category } from "../types";

export async function getAllCategories(): Promise<Category[]> {
  return await fetchAPI<Category[]>("/categories");
}

export async function createCategory(data: FormData): Promise<Category> {
  return await fetchAPI<Category>(`/categories`, {
    method: "POST",
    headers: { ...getAuthHeaders() },
    body: data,
  });
}

export async function updateCategory(
  id: string,
  data: FormData,
): Promise<Category> {
  return await fetchAPI<Category>(`/categories/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders() },
    body: data,
  });
}

export async function deleteCategory(id: string) {
  return await fetchAPI(`/categories/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
}
