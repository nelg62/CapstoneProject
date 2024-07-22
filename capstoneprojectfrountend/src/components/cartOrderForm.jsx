import { useCartContext } from "@/context/CartContext";
import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { OrdersApi } from "../../utils/api";
import { useUserContext } from "@/context/UserContext";

export default function CartOrderForm() {
  const { cart, clearCartAfterOrder, GetItemsInCart } = useCartContext();
  const { userState } = useUserContext();

  // const intialFormData = {
  //   location: "",
  //   phone: "",
  //   email: "",
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("orderform event", event.target);
    handlePlaceOrder();
    clearCartAfterOrder();
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${OrdersApi}`, {
        userId: userState.id,
        items: cart,
      });
      console.log("Order placed succesfully", response);
    } catch (error) {
      console.error("Error placing order", error);
      console.log("Failed to place order");
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
      {/* <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Delivery Location"
          name="location"
          sx={{ margin: "6px" }}
        />
        <TextField label="Phone Number" name="phone" sx={{ margin: "6px" }} />
        <TextField label="Email" name="email" sx={{ margin: "6px" }} />
      </Paper> */}
      <Paper>
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          CheckOut
        </Button>
      </Paper>
    </Box>
  );
}
