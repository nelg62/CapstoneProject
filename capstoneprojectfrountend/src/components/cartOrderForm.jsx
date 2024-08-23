import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { OrdersApi } from "../../utils/api";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function CartOrderForm() {
  const { cart, clearCartAfterOrder } = useCartContext();
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

      await clearCartAfterOrder(userState.id);

      setAlert({
        open: true,
        message: "Order Placed Successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error placing order", error);

      setAlert({
        open: true,
        message: "Failed to Place Order",
        severity: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="tw-w-full lg:tw-w-1/2 tw-p-4 tw-mt-2 tw-ml-2 tw-flex tw-flex-col"
    >
      <Card className="tw-p-4">
        {/* Checkout / order button */}
        <Button
          type="submit"
          className="tw-w-full tw-bg-blue-500 tw-text-white"
        >
          CheckOut
        </Button>
      </Card>
    </form>
  );
}
