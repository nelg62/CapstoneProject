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
        const userId = 1;
        const response = await axios.get(`${CartApi}/${userId}`);

        setCart(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
      setLoading(false);
    };
    fetchCart();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cart) {
    return <p>nothing in cart</p>;
  }

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CartListItems cart={cart} />
      <CartOrderForm cart={cart} />
    </Box>
  );
};

export default CartDetails;
