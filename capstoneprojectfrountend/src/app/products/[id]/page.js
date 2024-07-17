"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductDetail from "./ProductDetails";

const ProductDetailsPage = () => {
  return <ProductDetail />;
};

export default ProtectedRoute(ProductDetailsPage);
