"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";
import { useProductContext } from "@/context/ProductContext";
import DotsMobileStepper from "@/components/ImageSlider";
import AlignItemsList from "@/components/ReviewProductList";

const ProductDetail = () => {
  const { AddToCart } = useCartContext();
  const { userState } = useUserContext();
  const { id } = useParams();
  const { product, fetchProduct } = useProductContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  if (!product) {
    return <p>Product not found</p>;
  }

  function addToCart() {
    AddToCart(userState.id, product.id);
  }

  return (
    <div className="tw-p-4">
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
        <div>
          <DotsMobileStepper product={product} />
        </div>

        <div className="tw-max-w-sm tw-mx-auto">
          <Card className="tw-shadow-lg tw-rounded-lg tw-p-4">
            <CardContent>
              {loading ? (
                <Skeleton className="tw-h-8 tw-w-full tw-mb-4" />
              ) : (
                <h5 className="tw-text-center tw-bg-blue-600 tw-text-white tw-font-bold tw-p-2 tw-rounded">
                  {product.title}
                </h5>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Price</h6>
              {loading ? (
                <Skeleton className="tw-h-5 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center tw-font-semibold tw-text-blue-600">
                  ${product.price}
                </p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Rating</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">
                  <div className="tw-flex tw-justify-center">
                    {/* Assuming you have a star rating component */}
                    <div className="tw-flex tw-items-center">
                      <div className="tw-text-yellow-500">★</div>
                      <div>{product.rating}</div>
                    </div>
                  </div>
                </p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Description</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center tw-h-16 tw-overflow-hidden">
                  {product.description}
                </p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Category</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">{product.category}</p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Brand</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">{product.brand}</p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Availability</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">
                  {product.stock} {product.availabilityStatus}
                </p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Warranty Information</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">{product.warrantyInformation}</p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Shipping</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">{product.shippingInformation}</p>
              )}

              <Separator className="tw-my-4" />
              <h6 className="tw-font-semibold">Return Policy</h6>
              {loading ? (
                <Skeleton className="tw-h-4 tw-w-full tw-mb-4" />
              ) : (
                <p className="tw-text-center">{product.returnPolicy}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={addToCart}
                className="tw-w-full tw-bg-blue-600 tw-text-white tw-font-bold tw-mt-2 hover:tw-bg-blue-700"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Separator className="tw-my-8 tw-text-lg tw-font-semibold">
        Reviews
      </Separator>
      <AlignItemsList product={product} />
    </div>
  );
};

export default ProductDetail;
