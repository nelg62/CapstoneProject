import { useProductContext } from "@/context/ProductContext";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SortProductsButtons = () => {
  const { productsSort, setLoading, fetchProductsSort } = useProductContext();

  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchProductsSort(sortBy, order, category);
  }, [sortBy, order, category]);

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleOrderChange = (e) => setOrder(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  return (
    <div className="tw-flex tw-justify-end tw-mb-4 tw-space-x-4">
      {/* SortBy */}
      <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
        <SelectTrigger className="tw-w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>

      {/* Order */}
      <Select onValueChange={(value) => setOrder(value)} value={order}>
        <SelectTrigger className="tw-w-[180px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>

      {/* Category */}
      <Select onValueChange={(value) => setCategory(value)} value={category}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
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
  );
};

export default SortProductsButtons;
