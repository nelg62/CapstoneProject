import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { CartApi } from "../../utils/api";

export default function CartListItems() {
  // Context hooks for cart and user state
  const { cart, AddToCart, RemoveFromCart, cartDispitch, cartAction } =
    useCartContext();
  const { userState } = useUserContext();

  // Fetch cart items when component mounts or userState changes
  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        // Fetch cart items from API
        const response = await axios.get(`${CartApi}/${userState.id}`, {
          headers: { Authorization: `Bearer ${userState.token}` },
        });
        // use cartDispats to use actions context to move itens in to cart state
        cartDispitch({ type: cartAction.initCart, payload: response.data });
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    if (userState.isAuthenticated) fetchCart();
  }, [userState, cartAction.initCart, cartDispitch]);

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "10px",
        marginLeft: "10px",
      }}
    >
      <Paper sx={{ display: "flex" }}>
        <List
          dense
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {/* render each item in cart */}
          {cart.map((item) => {
            const labelId = `checkbox-list-secondary-label-${item.productId}`;
            return (
              <ListItem key={item.productId} disablePadding>
                <ListItemButton>
                  {/* Product image */}
                  <Box
                    component="img"
                    sx={{
                      height: 60,
                      display: "block",
                      maxWidth: 60,
                      overflow: "hidden",
                      width: "100%",
                    }}
                    alt={item.title}
                    src={item.thumbnail}
                  ></Box>
                  {/* Product Title */}
                  <ListItemText id={labelId} primary={item.title} />
                </ListItemButton>
                {/* Button to remove item from cart */}
                <ListItemButton
                  sx={{ justifyContent: "center" }}
                  onClick={() => RemoveFromCart(userState.id, item.productId)}
                >
                  <RemoveIcon />
                </ListItemButton>
                {/* Display quantity of item in cart */}
                <ListItemText sx={{ textAlign: "center" }}>
                  {item.quantity}
                </ListItemText>
                {/* Button to add item to cart */}
                <ListItemButton
                  sx={{ justifyContent: "center" }}
                  onClick={() => AddToCart(userState.id, item.productId)}
                >
                  <AddIcon />
                </ListItemButton>
                {/* Display price of the item  */}
                <ListItemText>${item.price}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Paper>

      {/* Display total price of cart */}
      <Typography sx={{ float: "right" }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
    </Box>
  );
}
