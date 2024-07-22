import axios from "axios";
import { useEffect, useState } from "react";
import { OrdersApi } from "../../utils/api";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard";

export default function TopOrderedItems() {
  const [TopOrderedItemsState, setTopOrderedItemsState] = useState([]);

  useEffect(() => {
    const fetchTopOrderedItems = async () => {
      try {
        const response = await axios.get(`${OrdersApi}/topOrderedItems`);
        console.log("topordereditems", response);
        setTopOrderedItemsState(response.data);
      } catch (error) {
        console.error("Error fetching top order items", error);
      }
    };
    fetchTopOrderedItems();
  }, []);

  return (
    <>
      <Typography>Top Ordered Items</Typography>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {TopOrderedItemsState.map((item) => (
            <Grid item xs={4} sm={6} md={6}>
              <Card
                key={item.productId}
                sx={{ maxWidth: 345, margin: "auto", marginTop: 4 }}
              >
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  alt={item.title}
                />
                <Box>
                  <CardContent>
                    <Typography>{item.title}</Typography>
                    <Typography>Price: ${item.price}</Typography>
                    <Typography>Ordered: {item.orderCount} times</Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
