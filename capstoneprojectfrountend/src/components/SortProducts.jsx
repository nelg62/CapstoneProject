import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";

const SortProductsButtons = () => {
  // Destructure values from ProductContext
  const { productsSort, setLoading, fetchProductsSort } = useProductContext();

  // State variables for sorting and filtering
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState("");

  // Fetch sorted and filtered products when sortBy, order, or category changes
  useEffect(() => {
    setLoading(true);
    fetchProductsSort(sortBy, order, category);
  }, [sortBy, order, category]);

  // Handlers for changing sort and filter options
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  return (
    <div className="tw-p-4">
      {/* Sorting and filtering options / controls */}
      <div className="tw-flex tw-justify-end tw-mb-4 tw-space-x-4">
        {/* SortBy */}
        <Select
          onValueChange={handleSortChange}
          value={sortBy}
          className="tw-w-40"
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>

        {/* Order */}
        <Select
          onValueChange={handleOrderChange}
          value={order}
          className="tw-w-40"
        >
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          onValueChange={handleCategoryChange}
          value={category}
          className="tw-w-40"
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="beauty">Beauty</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="fragrances">Fragrances</SelectItem>
            <SelectItem value="laptops">Laptops</SelectItem>
            <SelectItem value="smartphones">Smartphones</SelectItem>
            <SelectItem value="tablets">Tablets</SelectItem>
            <SelectItem value="vehicle">Vehicle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display the sorted and filtered products */}
      <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 tw-gap-4">
        {productsSort.length === 0
          ? Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="tw-w-full tw-h-64">
                <Skeleton className="tw-w-full tw-h-full tw-bg-gray-200" />
              </div>
            ))
          : productsSort.map((product) => (
              <div key={product.id} className="tw-w-full h-64">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default SortProductsButtons;
