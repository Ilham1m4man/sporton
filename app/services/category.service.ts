import { fetchAPI } from "../lib/api";
import { Category } from "../types";

export async function getAllCategories(): Promise<Category[]> {
    return await fetchAPI<Category[]>("/categories")
}