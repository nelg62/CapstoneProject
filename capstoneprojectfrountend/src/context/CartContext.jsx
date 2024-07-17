"use client";

import axios from "axios";
import { CartApi } from "../../utils/api";
import { useUserContext } from "./UserContext";
const { createContext, useContext, useEffect, useReducer } = require("react");

export const cartAction = {
  initCart: "initCart",
  addToCart: "addToCart",
  removeFromCart: "removeFromCart",
};

const CartContext = createContext();

const initialState = [];

function reducer(state, action) {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case cartAction.initCart: {
      return action.payload;
    }
    case cartAction.addToCart: {
      const newItem = action.payload;
      const existingItem = state.find(
        (item) => item.productId === newItem.productId
      );
      console.log("existing item", existingItem);
      if (existingItem) {
        return state.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...state, { ...newItem, quantity: 1 }];
    }
    case cartAction.removeFromCart: {
      return state
        .map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }
    default: {
      return state;
    }
  }
}

export const CartProvider = ({ children }) => {
  const [cart, cartDispitch] = useReducer(reducer, initialState);
  const { user } = useUserContext();

  useEffect(() => {
    console.log("useeffect user", user);
    if (user && user.id) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`${CartApi}/${user.user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          cartDispitch({ type: cartAction.initCart, payload: response.data });
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };
      fetchCart();
    }
  }, [user]);

  const AddToCart = async (userId, productId) => {
    try {
      const response = await axios.post(
        `${CartApi}`,
        {
          userId,
          productId,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log("addtocart responce", response);

      cartDispitch({
        type: cartAction.addToCart,
        payload: response.data,
      });

      // console.log("rsponse", response.data);

      console.log("Item atted to cart in database");
    } catch (error) {
      console.error("Error adding item to cart in database");
    }
  };

  const RemoveFromCart = async (userId, productId) => {
    try {
      const response = await axios.delete(`${CartApi}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { userId, productId },
      });
      if (response.status === 200) {
        cartDispitch({
          type: cartAction.removeFromCart,
          payload: { productId },
        });
        console.log("Product removed from cart", response);
      } else {
        console.error("Failed to remove product from cart:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, cartDispitch, AddToCart, cartAction, RemoveFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
