"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import CartDetail from "./CartDetails";

const CartDetailsPage = () => {
  return <CartDetail />;
};

export default ProtectedRoute(CartDetailsPage);
