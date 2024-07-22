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
  const { cart, AddToCart, RemoveFromCart, cartDispitch, cartAction } =
    useCartContext();
  const { userState } = useUserContext();

  React.useEffect(() => {
    console.log("useeffect user", userState);

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${CartApi}/${userState.id}`, {
          headers: { Authorization: `Bearer ${userState.token}` },
        });
        cartDispitch({ type: cartAction.initCart, payload: response.data });
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchCart();
  }, []);

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
          {cart.map((item) => {
            const labelId = `checkbox-list-secondary-label-${item.productId}`;
            return (
              <ListItem key={item.productId} disablePadding>
                <ListItemButton>
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
                  <ListItemText id={labelId} primary={item.title} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => RemoveFromCart(userState.id, item.productId)}
                >
                  <RemoveIcon />
                </ListItemButton>
                <ListItemText>{item.quantity}</ListItemText>
                <ListItemButton>
                  <AddIcon
                    onClick={() => AddToCart(userState.id, item.productId)}
                  />
                </ListItemButton>
                <ListItemText>${item.price}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <Typography sx={{ float: "right" }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>
    </Box>
  );
}
