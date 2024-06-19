"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { ProductApi } from "../../../../utils/api";
import DotsMobileStepper from "@/components/ImageSlider";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  console.log(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${ProductApi}/${id}`);
          console.log("response", response.data);
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product details", error);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <DotsMobileStepper product={product} />
      <Card sx={{ maxWidth: 345, margin: "auto", marginTop: 4 }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.availabilityStatus} {product.stock} Left
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductDetail;
