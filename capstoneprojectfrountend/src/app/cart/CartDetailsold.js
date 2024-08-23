"use client";
import CartListItems from "@/components/cartListItems";
import CartOrderForm from "@/components/cartOrderForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Box } from "@mui/material";

const CartDetails = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CartListItems />
      <CartOrderForm />
    </Box>
  );
};

export default ProtectedRoute(CartDetails);
