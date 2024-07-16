import ProtectedRoute from "@/components/ProtectedRoute";
import ProductDetail from "./ProductDetails";

const ProductDetailsPage = () => {
  return (
    <ProtectedRoute>
      <ProductDetail />
    </ProtectedRoute>
  );
};

export default ProductDetailsPage;
