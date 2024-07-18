"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { ProductApi } from "../../../../utils/api";
import DotsMobileStepper from "@/components/ImageSlider";
import AlignItemsList from "@/components/ReviewProductList";
import { cartAction, useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";

const ProductDetail = () => {
  const { cartDispitch, cartAction, AddToCart } = useCartContext();
  const { userState } = useUserContext();
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
    console.log("userid", userState.user.id);
    console.log("productid", product);
    AddToCart(userState.user.id, product.id);
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

            {/* <Typography variant="body2" color="text.secondary">
              {product.stock}
            </Typography> */}
            {/* <Typography variant="body2" color="text.secondary">
              {product.tags}
            </Typography> */}

            <Divider sx={{ fontWeight: "600" }}>Brand</Divider>

            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="body1"
              color="text.secondary"
            >
              {product.brand}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {product.weight}
            </Typography> */}
            {/* <Typography variant="body2" color="text.secondary">
              {product.width} {product.height}
              {product.depth}
            </Typography> */}

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
            {/* <Typography variant="body2" color="text.secondary">
              {product.availabilityStatus}
            </Typography> */}

            <Divider sx={{ fontWeight: "600" }}>Return Policy</Divider>

            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="body1"
              color="text.secondary"
            >
              {product.returnPolicy}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              {product.minimumOrderQuantity}
            </Typography> */}
          </CardContent>
          <Button
            onClick={addToCart}
            variant="contained"
            sx={{ width: "100%", fontWeight: "700" }}
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
