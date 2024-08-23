"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopOrderedItems from "@/components/TopOrderedItems";

function dash() {
  return (
    <>
      <TopOrderedItems />
    </>
  );
}

export default ProtectedRoute(dash);
