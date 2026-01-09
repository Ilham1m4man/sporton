"use client";

import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductActions() {
  const { push } = useRouter();
  const [qty, setQty] = useState(0);

  const checkout = () => {};

  return (
    <div className="flex gap-5">
      <div className="border border-gray-500 inline-flex w-fit min-w-20.5">
        <div className="aspect-square text-xl font-medium border-r border-gray-500 flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col">
          <button
            className="border-b border-gray-500 cursor-pointer h-1/2 aspect-square flex items-center justify-center"
            onClick={() => setQty((prev) => Math.min(prev + 1, 1000))}
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
      <Button className="px-8 w-full">
        <FiShoppingBag size={24} />
        Add to Cart
      </Button>
      <Button
        variant="dark"
        className="px-8 w-full"
        onClick={() => push("/checkout")}
      >
        Checkout Now
        <FiArrowRight size={24} />
      </Button>
    </div>
  );
}
