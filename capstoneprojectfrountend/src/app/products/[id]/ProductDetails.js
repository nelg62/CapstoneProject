"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
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
              {product.dimensions.width} {product.dimensions.height}
              {product.dimensions.depth}
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
        </Card>
      </Box>

      <AlignItemsList product={product} />

      <Card sx={{ width: "100%", margin: "auto", marginTop: 4 }}>
        <CardContent>
          {product.reviews.map((review, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <Typography variant="body2" color="text.secondary">
                <strong>{review.reviewerName}</strong>{" "}
                <div>
                  <Rating value={review.rating} readOnly precision={0.5} />{" "}
                  {review.rating}
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductDetail;
