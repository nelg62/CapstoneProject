"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import SortProductsButtons from "@/components/SortProducts";

function Products() {
  return (
    <>
      <SortProductsButtons />
    </>
  );
}

export default ProtectedRoute(Products);
