import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Transaction } from "../types";

export async function transactionCheckout(
  form: FormData,
): Promise<Transaction> {
  return await fetchAPI<Transaction>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
}

export async function getTransactionById(id: string): Promise<Transaction> {
  return await fetchAPI<Transaction>(`/transactions/${id}`);
}

export async function getAllTransactions(): Promise<Transaction[]> {
  return await fetchAPI<Transaction[]>("/transactions", {
    headers: { ...getAuthHeaders() },
  });
}

export async function updateTransaction(
  id: string,
  data: FormData,
): Promise<Transaction> {
  return await fetchAPI<Transaction>(`/transactions/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders() },
    body: data,
  });
}

// export async function deleteTransaction(id: string) {
//   return await fetchAPI(`/transactions/${id}`, {
//     method: "DELETE",
//     headers: { ...getAuthHeaders() },
//   });
// }