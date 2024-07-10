"use client";
import CartListItems from "@/components/cartListItems";
import CartOrderForm from "@/components/cartOrderForm";
import { Box } from "@mui/material";
import { CartApi } from "../../../utils/api";
import { useEffect, useState } from "react";
import axios from "axios";

const CartDetails = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${CartApi}/${userId}`);

        // setCart(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
      setLoading(false);
    };
    fetchCart();
  }, []);
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CartListItems cart={cart} />
      <CartOrderForm cart={cart} />
    </Box>
  );
};

export default CartDetails;
