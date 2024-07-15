"use client";

import axios from "axios";
import { CartApi } from "../../utils/api";
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
      return [...state, action.payload];
    }
    case cartAction.removeFromCart: {
      console.log("remove action state", state, action);
      return state.filter(
        (item) =>
          item.productId !== action.payload.productId ||
          item.userId !== action.payload.userId
      );
    }
    default: {
      return state;
    }
  }
}

export const CartProvider = ({ children }) => {
  const [cart, cartDispitch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = 1;
        const response = await axios.get(`${CartApi}/${userId}`);

        cartDispitch({ type: cartAction.initCart, payload: response.data });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchCart();
  }, []);

  const AddToCart = async (userId, productId) => {
    try {
      const response = await axios.post(`${CartApi}`, {
        userId,
        productId,
      });
      console.log("addtocart responce", response);

      cartDispitch({
        type: cartAction.addToCart,
        payload: response.data,
      });

      console.log("rsponse", response.data);

      console.log("Item atted to cart in database");
    } catch (error) {
      console.error("Error adding item to cart in database");
    }
  };

  const RemoveFromCart = async (userId, productId) => {
    try {
      const response = await axios.delete(`${CartApi}`, {
        data: { userId, productId },
      });
      if (response.status === 200) {
        cartDispitch({
          type: cartAction.removeFromCart,
          payload: { userId, productId },
        });
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
