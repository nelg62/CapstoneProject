"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SortProductsButtons from "@/components/SortProducts";

function Products() {
  return (
    <>
      <h1>Welcome to the Products page</h1>
      <SortProductsButtons />
    </>
  );
}

export default ProtectedRoute(Products);
