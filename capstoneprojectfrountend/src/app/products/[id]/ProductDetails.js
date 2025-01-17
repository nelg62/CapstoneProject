"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import DotsMobileStepper from "@/components/ImageSlider";
import AlignItemsList from "@/components/ReviewProductList";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import { useProductContext } from "@/context/ProductContext";
import theme from "@/styles/theme";

const ProductDetail = () => {
  const { AddToCart } = useCartContext();
  const { userState } = useUserContext();
  const { id } = useParams();
  const { product, fetchProduct } = useProductContext();
  const [loading, setLoading] = useState(true);

  // Fetch product details when component mounts or product ID changes
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  // Set loading to false when product data is available
  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  // When product is not found
  if (!product) {
    return <p>Product not found</p>;
  }

  // Add product to cart pass user id and product id
  function addToCart() {
    AddToCart(userState.id, product.id);
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* Image slider */}
          <DotsMobileStepper product={product} />
        </Grid>

        {/* Product details */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              maxWidth: 345,
              margin: "auto",
              padding: 2,
              boxShadow: theme.shadows[3],
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <CardContent>
              {loading ? (
                <Skeleton variant="h5"></Skeleton>
              ) : (
                // Product title
                <Typography
                  sx={{
                    textAlign: "center",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    fontWeight: "700",
                    padding: 1,
                    borderRadius: 1,
                  }}
                  gutterBottom
                  variant="h5"
                >
                  {product.title}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>Price</Divider>
              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product price
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: theme.palette.primary.main,
                  }}
                  gutterBottom
                  variant="body1"
                >
                  ${product.price}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>Rating</Divider>

              {loading ? (
                <Skeleton variant="body2"></Skeleton>
              ) : (
                // Product rating
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body2"
                >
                  <Rating
                    sx={{ top: "7px" }}
                    value={product.rating}
                    readOnly
                    precision={0.5}
                  />
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>
                Description
              </Divider>
              {loading ? (
                <Skeleton variant="body2"></Skeleton>
              ) : (
                // Product description
                <Typography
                  sx={{
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: 60,
                  }}
                  gutterBottom
                  variant="body2"
                >
                  {product.description}
                </Typography>
              )}
              <Divider sx={{ marginY: 2, fontWeight: "600" }}>Category</Divider>
              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product category
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body1"
                >
                  {product.category}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>Brand</Divider>

              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product brand
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body1"
                >
                  {product.brand}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>
                Availability
              </Divider>

              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product abvailability
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body1"
                >
                  {product.stock} {product.availabilityStatus}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>
                Warranty Information
              </Divider>

              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product warranty information
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body1"
                >
                  {product.warrantyInformation}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>Shipping</Divider>

              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product shipping information
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body1"
                >
                  {product.shippingInformation}
                </Typography>
              )}

              <Divider sx={{ marginY: 2, fontWeight: "600" }}>
                Return Policy
              </Divider>

              {loading ? (
                <Skeleton variant="body1"></Skeleton>
              ) : (
                // Product retun policy
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="body1"
                >
                  {product.returnPolicy}
                </Typography>
              )}
            </CardContent>
            {/* Add to cart button */}
            <Button
              onClick={addToCart}
              variant="contained"
              sx={{
                width: "100%",
                fontWeight: "700",
                marginTop: 2,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Add to Cart
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 4, fontWeight: 600, fontSize: 25 }}>
        Reviews
      </Divider>
      {/* Reviews section */}
      <AlignItemsList product={product} />
    </Box>
  );
};

export default ProductDetail;
