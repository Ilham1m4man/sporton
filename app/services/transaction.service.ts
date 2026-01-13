import { fetchAPI } from "../lib/api";
import { Transaction } from "../types";

export async function transactionCheckout(
  form: FormData
): Promise<Transaction> {
  return await fetchAPI<Transaction>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
}

export async function getTransactionById(id: string): Promise<Transaction> {
    return await fetchAPI<Transaction>(`/transactions/${id}`)
}
