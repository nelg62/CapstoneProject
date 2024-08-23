"use client";
import CartListItems from "@/components/cartListItems";
import CartOrderForm from "@/components/cartOrderForm";
import ProtectedRoute from "@/components/ProtectedRoute";

const CartDetails = () => {
  return (
    <div className="tw-flex tw-flex-col lg:tw-flex-row tw-w-full">
      <CartListItems />
      <CartOrderForm />
    </div>
  );
};

export default ProtectedRoute(CartDetails);
