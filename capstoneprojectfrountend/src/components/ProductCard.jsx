"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Collapse,
  Divider,
  IconButton,
  Rating,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import theme from "@/styles/theme";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ product }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const { AddToCart } = useCartContext();
  const { userState } = useUserContext();

  function addToCart() {
    AddToCart(userState.id, product.id);
  }

  const handleExpandClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

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
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: theme.palette.background.default,
        borderColor: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: theme.shadows[3],
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        {loading ? (
          <Skeleton variant="rectangle" height={200}></Skeleton>
        ) : (
          // Product Image
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{
              objectFit: "contain",
              maxWidth: 344,
              height: 194,
            }}
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
              sx={{
                color: theme.palette.text.primary,
                marginLeft: "5px",
                minHeight: "44px",
                maxHeight: "44px",
                marginBottom: "20px",
              }}
            >
              {product.title}
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="body1"></Skeleton>
          ) : (
            // Product price
            <Typography
              sx={{
                fontWeight: "700",
                marginRight: "5px",
                marginLeft: "5px",
                color: theme.palette.primary.main,
              }}
              variant="body1"
            >
              ${product.price}
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="body2"></Skeleton>
          ) : (
            // Product rating
            <Typography
              gutterBottom
              variant="body2"
              color={theme.palette.text.secondary}
            >
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
            // Product category
            <Typography
              sx={{ marginLeft: "5px", color: theme.palette.text.secondary }}
              gutterBottom
              variant="body2"
            >
              Category: {product.category}
            </Typography>
          )}

          {loading ? (
            <Skeleton variant="body1"></Skeleton>
          ) : (
            // Product availability status
            <Typography
              variant="body1"
              sx={{
                float: "left",
                marginLeft: "5px",
                color: theme.palette.text.primary,
              }}
            >
              {product.stock} {product.availabilityStatus}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <Button
          onClick={addToCart}
          sx={{
            marginLeft: "5px",
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          Add To Cart
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{
            float: "right",
            color: theme.palette.primary.main,
            "&:hover": {
              color: theme.palette.primary.dark,
            },
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider
            sx={{
              marginBottom: "5px",
              borderColor: theme.palette.secondary.main,
            }}
          />
          {loading ? (
            <Skeleton variant="body2"></Skeleton>
          ) : (
            // Product description
            <Typography
              sx={{
                minHeight: 100,
                maxHeight: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: theme.palette.text.secondary,
              }}
              gutterBottom
              variant="body2"
            >
              {product.description}
            </Typography>
          )}
          <Divider
            sx={{
              marginBottom: "5px",
              borderColor: theme.palette.secondary.main,
            }}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
