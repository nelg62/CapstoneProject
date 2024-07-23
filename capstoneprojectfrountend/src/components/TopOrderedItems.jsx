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
import ProductCard from "./ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

export default function TopOrderedItems() {
  const [TopOrderedItemsState, setTopOrderedItemsState] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 5000);

  useEffect(() => {
    const fetchTopOrderedItems = async () => {
      try {
        const response = await axios.get(`${OrdersApi}/topOrderedItems`);

        setTopOrderedItemsState(response.data);
      } catch (error) {
        console.error("Error fetching top order items", error);
      }
    };
    fetchTopOrderedItems();
  }, []);

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
          {TopOrderedItemsState.map((item) => (
            <Grid key={item.productId} item xs={2} sm={4} md={4}>
              <Card
                key={item.productId}
                sx={{
                  maxWidth: 345,
                  margin: "auto",
                  marginTop: 4,
                }}
              >
                <CardActionArea onClick={() => handleCardClick(item.productId)}>
                  {loading ? (
                    <Skeleton height={300}></Skeleton>
                  ) : (
                    <CardMedia
                      component="img"
                      image={item.thumbnail}
                      alt={item.title}
                    />
                  )}
                  <Box>
                    <CardContent>
                      {loading ? (
                        <Skeleton variant="h5"></Skeleton>
                      ) : (
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ marginLeft: "5px" }}
                        >
                          {item.title}
                        </Typography>
                      )}
                      {loading ? (
                        <Skeleton variant="body1"></Skeleton>
                      ) : (
                        <Typography
                          sx={{
                            float: "right",
                            fontWeight: "700",
                            marginRight: "5px",
                          }}
                          variant="body1"
                        >
                          Price: ${item.price}
                        </Typography>
                      )}
                      {loading ? (
                        <Skeleton variant="body1"></Skeleton>
                      ) : (
                        <Typography variant="body1" sx={{ marginLeft: "5px" }}>
                          Ordered: {item.orderCount} times
                        </Typography>
                      )}
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
