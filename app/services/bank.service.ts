import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Banks } from "../types";

export async function getAllBanks(): Promise<Banks[]> {
  return await fetchAPI<Banks[]>("/banks");
}

export async function createBank(data: Partial<Banks>): Promise<Banks> {
  return await fetchAPI<Banks>(`/banks`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateBank(
  id: string,
  data: Partial<Banks>,
): Promise<Banks> {
  return await fetchAPI<Banks>(`/banks/${id}`, {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteBank(id: string) {
  return await fetchAPI(`/banks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
}
