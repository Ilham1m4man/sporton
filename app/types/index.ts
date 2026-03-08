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

export interface TransactionItem {
  id: string;
  transaction_id: string;
  product_id: string;             
  qty: number;
  price_at_purchase: string;
  product: {                       
    id: string;
    name: string;
    description: string;
    image_url: string;
    stock: number;
    price: number;
    category_id: string;
  };
}

export interface Transaction {
  id: string;
  payment_proof: string;
  status: "pending" | "paid" | "rejected";
  items: TransactionItem[];         
  total_payment: number;
  customer_name: string;
  customer_contact: string | null;  
  customer_address: string;
  created_at: string;
  updated_at: string;
}