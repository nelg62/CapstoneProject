"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginLeft: "5px" }}
          >
            {product.title}
          </Typography>

          <Divider />

          <Typography gutterBottom variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <Divider sx={{ marginBottom: "5px" }} />

          <Typography
            sx={{ float: "right", fontWeight: "700", marginRight: "5px" }}
            variant="body1"
          >
            ${product.price}
          </Typography>

          <Typography variant="body1" sx={{ marginLeft: "5px" }}>
            {product.stock} {product.availabilityStatus}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
