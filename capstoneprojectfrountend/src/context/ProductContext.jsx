"use client";
import axios from "axios";
import { ProductApi } from "../../utils/api";

const { createContext, useState, useContext } = require("react");

// Create ProductContext
const ProductContext = createContext();

// ProduxtProvider component to provide product state and actions
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [productsSort, setProductsSort] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch a single product by ID
  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`${ProductApi}/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details", error);
      setLoading(false);
    }
  };

  // Function to fetch and sort products by specific criteria
  const fetchProductsSort = async (sortBy, order, category) => {
    try {
      const response = await axios.get(`${ProductApi}`, {
        params: { sortBy, order, category },
      });
      setProductsSort(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        productsSort,
        loading,
        setLoading,
        fetchProduct,
        fetchProductsSort,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useProductContext = () => useContext(ProductContext);
