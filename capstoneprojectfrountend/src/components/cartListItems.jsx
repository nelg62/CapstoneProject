"use client";

import { useEffect } from "react";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { CartApi } from "../../utils/api";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Minus } from "lucide-react";

export default function CartListItems() {
  const { cart, AddToCart, RemoveFromCart, cartDispitch, cartAction } =
    useCartContext();
  const { userState } = useUserContext();

  useEffect(() => {
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
    if (userState.isAuthenticated) fetchCart();
  }, [userState]);

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="tw--4">
      <Card className="tw-flex tw-flex-col">
        {cart.map((item) => {
          return (
            <div
              key={item.productId}
              className="tw-flex tw-items-center tw-py-2 tw-border-b tw-border-gray-200"
            >
              {/* Updated Avatar component */}
              <Avatar className="tw-w-16 tw-h-16 tw-mr-4">
                <AvatarImage src={item.thumbnail} alt={item.title} />
                <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="tw-flex-1">
                <div className="tw-text-lg tw-font-semibold">{item.title}</div>
              </div>
              <Button
                variant="outline"
                onClick={() => RemoveFromCart(userState.id, item.productId)}
                className="tw-mx-2"
              >
                <Minus className="tw-w-6 tw-h-6" />
              </Button>
              <div className="tw-text-center">{item.quantity}</div>
              <Button
                variant="outline"
                onClick={() => AddToCart(userState.id, item.productId)}
                className="tw-mx-2"
              >
                <Plus className="tw-w-6 tw-h-6" />
              </Button>
              <div>${Number(item.price).toFixed(2)}</div>
            </div>
          );
        })}
        <div className="tw-text-right tw-p-4 tw-text-xl tw-font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </Card>
    </div>
  );
}
