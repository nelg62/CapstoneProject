import ProductCard from "./ProductCard";

const { useProductContext } = require("@/context/ProductContext");
const { Select, MenuItem, Grid, Box } = require("@mui/material");
const { useState, useEffect } = require("react");

const SortProductsButtons = () => {
  const { productsSort, loading, fetchProductsSort } = useProductContext();
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProductsSort(sortBy, order, category);
  }, [sortBy, order, category]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
        <Select value={order} onChange={handleOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
        <Select value={category} onChange={handleCategoryChange}>
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="beauty">Beauty</MenuItem>
          <MenuItem value="furniture">Furniture</MenuItem>
          <MenuItem value="fragrances">Fragrances</MenuItem>
          <MenuItem value="laptops">Laptops</MenuItem>
          <MenuItem value="smartphones">Smartphones</MenuItem>
          <MenuItem value="tablets">Tablets</MenuItem>
          <MenuItem value="vehicle">Vehicle</MenuItem>
        </Select>
      </Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          {productsSort.map((product) => (
            <Grid key={product.id} item xs={2} sm={4} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SortProductsButtons;
