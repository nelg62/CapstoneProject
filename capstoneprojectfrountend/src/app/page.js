"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

function Home() {
  return <h1>Welcome to the home page</h1>;
}

export default ProtectedRoute(Home);
