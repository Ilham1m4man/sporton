"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import { Product } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import { Button } from "../ui/button";

type TProductActionsProps = {
  product: Product;
  stock: number;
};

export default function ProductActions({
  product,
  stock,
}: TProductActionsProps) {
  const { push } = useRouter();
  const { addItem } = useCartStore();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  const handleCheckout = () => {
    addItem(product);
    push("/checkout");
  };

  return (
    <div className="flex gap-5">
      <div className="border border-gray-500 inline-flex w-fit min-w-20.5">
        <div className="aspect-square text-xl font-medium border-r border-gray-500 flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col">
          <button
            className="border-b border-gray-500 cursor-pointer h-1/2 aspect-square flex items-center justify-center"
            onClick={() => setQty((prev) => Math.min(prev + 1, stock))}
          >
            <FiChevronUp />
          </button>
          <button
            className="cursor-pointer h-1/2 aspect-square flex items-center justify-center"
            onClick={() => setQty((prev) => Math.max(prev - 1, 0))}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>
      <Button onClick={handleAddToCart} className="px-8 w-full">
        <FiShoppingBag size={24} />
        Add to Cart
      </Button>
      <Button variant="dark" className="px-8 w-full" onClick={handleCheckout}>
        Checkout Now
        <FiArrowRight size={24} />
      </Button>
    </div>
  );
}
