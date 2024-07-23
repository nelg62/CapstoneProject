"use client";

import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import DotsMobileStepper from "@/components/ImageSlider";
import AlignItemsList from "@/components/ReviewProductList";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import { useProductContext } from "@/context/ProductContext";

const ProductDetail = () => {
  const { cartDispitch, AddToCart } = useCartContext();
  const { userState } = useUserContext();
  const { id } = useParams();
  const { product, loading, fetchProduct } = useProductContext();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  function addToCart() {
    AddToCart(userState.id, product.id);
  }

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={6} md={6}>
          <DotsMobileStepper product={product} />
        </Grid>
        <Grid item xs={4} sm={6} md={6}>
          <Card sx={{ maxWidth: 345, margin: "auto", marginTop: 4 }}>
            <CardContent>
              <Typography
                sx={{
                  textAlign: "center",
                  backgroundColor: "#0E4277",
                  color: "white",
                  fontWeight: "700",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {product.title}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Price</Divider>

              <Typography
                sx={{ textAlign: "center", fontWeight: "600" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                ${product.price}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Rating</Divider>

              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body2"
                color="text.secondary"
              >
                <Rating
                  sx={{ top: "7px" }}
                  value={product.rating}
                  readOnly
                  precision={0.5}
                />
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Description</Divider>
              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body2"
                color="text.secondary"
              >
                {product.description}
              </Typography>
              <Divider sx={{ fontWeight: "600" }}>Category</Divider>
              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                {product.category}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Brand</Divider>

              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                {product.brand}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Availability</Divider>

              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                {product.stock} {product.availabilityStatus}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Warranty Information</Divider>

              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                {product.warrantyInformation}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Shipping</Divider>

              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                {product.shippingInformation}
              </Typography>

              <Divider sx={{ fontWeight: "600" }}>Return Policy</Divider>

              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                color="text.secondary"
              >
                {product.returnPolicy}
              </Typography>
            </CardContent>
            <Button
              onClick={addToCart}
              variant="contained"
              sx={{ width: "100%", fontWeight: "700" }}
            >
              Add to Cart
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ fontWeight: 600, fontSize: 25 }}>Reviews</Divider>
      <AlignItemsList product={product} />
    </Box>
  );
};

export default ProductDetail;
