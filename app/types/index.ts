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
