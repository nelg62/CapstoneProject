import { useCartContext } from "@/context/CartContext";
import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { OrdersApi } from "../../utils/api";
import { useUserContext } from "@/context/UserContext";

export default function CartOrderForm() {
  const { cart, clearCartAfterOrder, GetItemsInCart } = useCartContext();
  const { userState, setAlert } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handlePlaceOrder();
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${OrdersApi}`, {
        userId: userState.id,
        items: cart,
      });
      console.log("Order placed succesfully", response);
      await clearCartAfterOrder(userState.id);
      setAlert({
        open: true,
        message: "Order Placed Successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error placing order", error);
      console.log("Failed to place order");
      setAlert({
        open: true,
        message: "Failed to Place Order",
        severity: "error",
      });
    }
  };

  return (
    <Box
      component={"form"}
      sx={{
        width: "100%",
        marginTop: "10px",
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      <Paper>
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          CheckOut
        </Button>
      </Paper>
    </Box>
  );
}
