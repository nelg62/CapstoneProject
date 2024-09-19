import axios from "axios";
import { useEffect, useState } from "react";
import { OrdersApi } from "../../utils/api";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import theme from "@/styles/theme";

export default function TopOrderedItems() {
  // State to store top ordered items
  const [TopOrderedItemsState, setTopOrderedItemsState] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Fetch top ordered items when component mounts
  useEffect(() => {
    const fetchTopOrderedItems = async () => {
      try {
        const response = await axios.get(`${OrdersApi}/topOrderedItems`);

        setTopOrderedItemsState(response.data);
      } catch (error) {
        console.error("Error fetching top order items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopOrderedItems();
  }, []);

  // Handle card click to navigate to product details page
  const handleCardClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Top Ordered Items
      </Typography>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {loading //Show skeleton while loading and fetching data
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid key={index} item xs={2} sm={4} md={4}>
                  <Card sx={{ maxWidth: 345, margin: "auto", marginTop: 4 }}>
                    <CardActionArea>
                      <Skeleton variant="rectangular" height={300} />
                      <Box>
                        <CardContent>
                          <Skeleton variant="h5" />
                          <Skeleton variant="body1" />
                          <Skeleton variant="body1" />
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            : TopOrderedItemsState.map((item) => (
                <Grid key={item.productId} item xs={2} sm={4} md={4}>
                  <Card
                    key={item.productId}
                    sx={{
                      maxWidth: 345,
                      backgroundColor: theme.palette.background.default,
                      borderColor: theme.palette.secondary.main,
                      border: `1px solid ${theme.palette.secondary.main}`,
                      boxShadow: theme.shadows[3],
                      borderRadius: theme.shape.borderRadius,
                    }}
                  >
                    {/* On Click action to navigate to product details page  */}
                    <CardActionArea
                      onClick={() => handleCardClick(item.productId)}
                    >
                      {/* Product Image */}
                      <CardMedia
                        component="img"
                        image={item.thumbnail}
                        alt={item.title}
                        sx={{
                          objectFit: "contain",
                          maxWidth: 344,
                          height: 194,
                        }}
                      />

                      <Box>
                        <CardContent>
                          {/* Product Title */}
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              color: theme.palette.text.primary,
                              marginLeft: "5px",
                              minHeight: "44px",
                              maxHeight: "44px",
                              marginBottom: "50px",
                            }}
                          >
                            {item.title}
                          </Typography>

                          {/* Product Price */}
                          <Typography
                            sx={{
                              fontWeight: "700",
                              marginRight: "5px",
                              marginLeft: "5px",
                              color: theme.palette.primary.main,
                            }}
                            variant="body1"
                          >
                            Price: ${item.price}
                          </Typography>

                          {/* Product orderCount */}
                          <Typography
                            variant="body1"
                            sx={{
                              marginLeft: "5px",
                              color: theme.palette.text.primary,
                            }}
                          >
                            Ordered: {item.orderCount} times
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
    </>
  );
}
