import { JSX } from "react/jsx-runtime"

export interface LoginCredential {
  email: string
  password: string
}

export interface LoginRes {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  stock: number;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Banks {
  id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  payment_proof: string;
  status: "pending" | "paid" | "rejected";
  items: {
    product_id: Product;
    qty: number;
  }[];
  total_payment: number;
  customer_name: string;
  customer_contact: number | null;
  customer_address: string;
  created_at: string;
  updated_at: string;
}
