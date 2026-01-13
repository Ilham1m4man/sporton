import { fetchAPI } from "../lib/api";
import { Banks } from "../types";

export async function getAllBanks(): Promise<Banks[]> {
    return await fetchAPI<Banks[]>("/banks")
}