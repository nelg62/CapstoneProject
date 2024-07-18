"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { MultipleProductsApi } from "../../../utils/api";
import axios from "axios";
import { Grid } from "@mui/material";
import ProtectedRoute from "@/components/ProtectedRoute";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(MultipleProductsApi);
        console.log(response.data);
        // setProducts(response.data.products);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Welcome to the Products page</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          {products.map((product) => (
            <Grid key={product.id} item xs={2} sm={4} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ProtectedRoute(Products);
