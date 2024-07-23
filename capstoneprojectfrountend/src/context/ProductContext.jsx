"use client";
import axios from "axios";
import { ProductApi } from "../../utils/api";

const { createContext, useState, useContext } = require("react");

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [productsSort, setProductsSort] = useState([]);
  const [loading, setLoading] = useState(true);

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

export const useProductContext = () => useContext(ProductContext);
