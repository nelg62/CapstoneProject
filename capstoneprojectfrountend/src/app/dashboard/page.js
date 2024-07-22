"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopOrderedItems from "@/components/TopOrderedItems";

function dash() {
  return (
    <>
      <h1>Welcome to the Dashboard page</h1>
      <TopOrderedItems />
    </>
  );
}

export default ProtectedRoute(dash);
