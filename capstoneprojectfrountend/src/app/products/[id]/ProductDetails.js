"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { ProductApi } from "../../../../utils/api";
import DotsMobileStepper from "@/components/ImageSlider";
import AlignItemsList from "@/components/ReviewProductList";
import { cartAction, useCartContext } from "@/context/CartContext";

const ProductDetail = () => {
  const { cartDispitch, cartAction, AddToCart } = useCartContext();
  const params = useParams();
  const id = params.id;
  // console.log(id);
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

  function addToCart() {
    AddToCart(1, product.id);
    console.log("addtoCart");
  }

  function removeFromCart() {
    cartDispitch({
      type: "removeFromCart",
    });
    console.log("removeFromCart");
  }

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <DotsMobileStepper product={product} />
        <Card sx={{ maxWidth: 345, margin: "auto", marginTop: 4 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Rating value={product.rating} readOnly precision={0.5} />
              {product.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.stock}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.tags}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.weight}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.width} {product.height}
              {product.depth}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.availabilityStatus} {product.stock} Left
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.warrantyInformation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.shippingInformation}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.availabilityStatus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.returnPolicy}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.minimumOrderQuantity}
            </Typography>
          </CardContent>
          <Button
            onClick={addToCart}
            variant="contained"
            sx={{ width: "100%" }}
          >
            Add to Cart
          </Button>
        </Card>
      </Box>

      <AlignItemsList product={product} />
    </Box>
  );
};

export default ProductDetail;
