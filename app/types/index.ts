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
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category;
  stock: number;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banks {
  _id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  paymentProof: string;
  status: "pending" | "paid" | "rejected";
  purchasedItems: {
    map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode
    productId: Product;
    qty: number;
  };
  totalPayment: number;
  customerName: string;
  customerContact: number | null;
  customerAddress: string;
  createdAt: string;
  updatedAt: string;
}
