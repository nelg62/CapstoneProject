import * as React from "react";
import { useCartContext } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react"; // Assuming you're using Lucide icons with shadcn
import Link from "next/link";
import { Button } from "./ui/button";

export default function CustomizedBadges() {
  const { cart } = useCartContext();

  return (
    <Link href="/cart">
      <Button
        aria-label="cart"
        className="tw-relative tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-text-white-700 hover:tw-text-gray-700 hover:tw-bg-gray-100 tw-rounded-md"
      >
        {/* Cart Icon */}
        <ShoppingCart className="tw-w-6 tw-h-6" />

        {/* Badge */}
        {cart.length > 0 && (
          <span className="tw-absolute tw-top-0 tw-right-0 tw-w-5 tw-h-5 tw-bg-red-600 tw-text-white tw-rounded-full tw-text-xs tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white">
            {cart.length}
          </span>
        )}
      </Button>
    </Link>
  );
}
