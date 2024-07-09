"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { MultipleProductsApi } from "../../../utils/api";
import axios from "axios";
import { Grid } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(MultipleProductsApi);
        // setProducts(response.data.products);
        setProducts(response.data.data);
        console.log(response.data.data);
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
        <Grid container spacing={8}>
          {products.map((product) => (
            <Grid key={product.id} item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
