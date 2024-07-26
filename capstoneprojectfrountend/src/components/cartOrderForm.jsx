import { useCartContext } from "@/context/CartContext";
import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { OrdersApi } from "../../utils/api";
import { useUserContext } from "@/context/UserContext";

export default function CartOrderForm() {
  const { cart, clearCartAfterOrder, GetItemsInCart } = useCartContext();
  const { userState, setAlert } = useUserContext();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handlePlaceOrder();
  };

  // Place order and handle success or failure
  const handlePlaceOrder = async () => {
    try {
      // Send order details to the server
      const response = await axios.post(`${OrdersApi}`, {
        userId: userState.id,
        items: cart,
      });
      console.log("Order placed succesfully", response);

      // Clear the cart after successful order
      await clearCartAfterOrder(userState.id);

      // Show success alert
      setAlert({
        open: true,
        message: "Order Placed Successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error placing order", error);
      console.log("Failed to place order");

      // Show error alert if order failed
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
        {/* Checkout / order button */}
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          CheckOut
        </Button>
      </Paper>
    </Box>
  );
}
