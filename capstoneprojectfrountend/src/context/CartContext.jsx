"use client";

import axios from "axios";
import { CartApi } from "../../utils/api";
import { useUserContext } from "./UserContext";
const { createContext, useContext, useEffect, useReducer } = require("react");

// Define cart actions
export const cartAction = {
  initCart: "initCart",
  addToCart: "addToCart",
  removeFromCart: "removeFromCart",
  clearCart: "clearCart",
};

// Create CartContext
const CartContext = createContext();

// Initial state for the cart
const initialState = [];

// Reducer function to handle cart actions
function reducer(state, action) {
  switch (action.type) {
    // Initial cart action
    case cartAction.initCart: {
      return action.payload;
    }
    // Add to cart action
    case cartAction.addToCart: {
      const newItem = action.payload;
      const existingItem = state.find(
        (item) => item.productId === newItem.productId
      );
      if (existingItem) {
        return state.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...state, { ...newItem, quantity: 1 }];
    }
    // Remove from cart action
    case cartAction.removeFromCart: {
      return state
        .map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }
    // Clear cart action
    case cartAction.clearCart: {
      return [];
    }
    default: {
      return state;
    }
  }
}

// CartProvider component to provide cart state and actions
export const CartProvider = ({ children }) => {
  const [cart, cartDispitch] = useReducer(reducer, initialState);
  const { userState, setAlert } = useUserContext();

  // Fetch cart items when component mounts or userState changes
  useEffect(() => {
    const fetchCart = async () => {
      console.log("userState", userState);
      if (userState.isAuthenticated) {
        try {
          const response = await axios.get(`${CartApi}/${userState.id}`, {
            headers: {
              Authorization: `Bearer ${userState.token}`,
              "x-api-key": process.env.API_KEY,
            },
          });
          cartDispitch({ type: cartAction.initCart, payload: response.data });
        } catch (error) {
          console.error("Error fetching products", error);
        }
      }
    };
    fetchCart();
  }, [userState]);

  // Function to get items in cart
  const GetItemsInCart = async () => {
    if (userState.isAuthenticated) {
      try {
        const response = await axios.get(`${CartApi}/${userState.id}`, {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            "x-api-key": process.env.API_KEY,
          },
        });
        cartDispitch({ type: cartAction.initCart, payload: response.data });
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }
  };

  // Function to add an item to cart
  const AddToCart = async (userId, productId) => {
    console.log("API Key add to cartfrount end:", process.env.API_KEY);

    try {
      const response = await axios.post(
        `${CartApi}`,
        {
          userId,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      console.log("addtocart responce", response);

      cartDispitch({
        type: cartAction.addToCart,
        payload: response.data,
      });

      console.log("Item atted to cart in database");
      setAlert({
        open: true,
        message: "Item added to Cart",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding item to cart in database");
      setAlert({
        open: true,
        message: "Failed to add Item to Cart",
        severity: "error",
      });
    }
  };

  // Function to remove an item from cart
  const RemoveFromCart = async (userId, productId) => {
    try {
      const response = await axios.delete(`${CartApi}`, {
        headers: {
          Authorization: `Bearer ${userState.token}`,
          "x-api-key": process.env.API_KEY,
        },
        data: { userId, productId },
      });
      if (response.status === 200) {
        cartDispitch({
          type: cartAction.removeFromCart,
          payload: { productId },
        });
        console.log("Product removed from cart", response);
        setAlert({
          open: true,
          message: "Removed Product from Cart",
          severity: "success",
        });
      } else {
        console.error("Failed to remove product from cart:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setAlert({
        open: true,
        message: "Failed to remove product from Cart",
        severity: "error",
      });
    }
  };

  // Function to clear the cart after order (for frountend and backend)
  const clearCartAfterOrder = async (userId) => {
    try {
      const response = await axios.post(
        `${CartApi}/clear`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      console.log("clearcartresponse", response);
      if (response) {
        cartDispitch({ type: cartAction.clearCart });
        console.log("Cart has been cleared in backend", response);
      }
    } catch (error) {
      console.error("Error failed to clear cart in backend", error);
    }
  };

  // Function to clear the cart (for logout)
  const clearCart = () => {
    cartDispitch({ type: cartAction.clearCart });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartDispitch,
        AddToCart,
        cartAction,
        RemoveFromCart,
        clearCart,
        GetItemsInCart,
        clearCartAfterOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCartContext = () => {
  return useContext(CartContext);
};
