"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Rating, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  // Set loading state to false once product is available
  React.useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  // Redirect to product details page on card click
  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCardClick}>
        {loading ? (
          <Skeleton variant="rectangle" height={200}></Skeleton>
        ) : (
          // Product Image
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
          />
        )}
        <CardContent>
          {loading ? (
            <Skeleton variant="h5"></Skeleton>
          ) : (
            // Product Title
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginLeft: "5px" }}
            >
              {product.title}
            </Typography>
          )}

          <Divider />
          {loading ? (
            <Skeleton variant="body2"></Skeleton>
          ) : (
            // Product description
            <Typography
              sx={{
                maxHeight: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              gutterBottom
              variant="body2"
              color="text.secondary"
            >
              {product.description}
            </Typography>
          )}

          <Divider sx={{ marginBottom: "5px" }} />

          {loading ? (
            <Skeleton variant="body1"></Skeleton>
          ) : (
            // Product category
            <Typography
              sx={{ marginLeft: "5px" }}
              gutterBottom
              variant="body1"
              color="text.secondary"
            >
              Category: {product.category}
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="body2"></Skeleton>
          ) : (
            // Product rating
            <Typography gutterBottom variant="body2" color="text.secondary">
              <Rating
                sx={{ top: "7px" }}
                value={product.rating}
                readOnly
                precision={0.5}
              />
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="body1"></Skeleton>
          ) : (
            // Product price
            <Typography
              sx={{ float: "right", fontWeight: "700", marginRight: "5px" }}
              variant="body1"
            >
              ${product.price}
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="body1"></Skeleton>
          ) : (
            // Product availability status
            <Typography variant="body1" sx={{ marginLeft: "5px" }}>
              {product.stock} {product.availabilityStatus}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
