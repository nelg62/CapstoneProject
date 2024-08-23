"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCartContext } from "@/context/CartContext";
import { useUserContext } from "@/context/UserContext";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { AddToCart } = useCartContext();
  const { userState } = useUserContext();

  function addToCart() {
    AddToCart(userState.id, product.id);
  }

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      className="tw-bg-gray-100 tw-border tw-border-gray-300 tw-shadow-lg tw-rounded-lg tw-cursor-pointer tw-flex tw-flex-col tw-h-full hover:tw-shadow-lg hover:tw-shadow-gray-400 hover:tw-bg-gray-200"
      onClick={handleCardClick}
    >
      <CardHeader className="tw-flex-grow">
        <CardTitle className="tw-text-lg tw-font-semibold tw-text-gray-900">
          {loading ? "Loading..." : product.title}
        </CardTitle>
        <CardDescription className="tw-text-gray-600">
          {loading ? "Loading description..." : `Category: ${product.category}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="tw-flex tw-flex-col tw-items-center tw-flex-grow">
        {loading ? (
          <div className="tw-w-full tw-h-40 tw-bg-gray-200 tw-animate-pulse"></div>
        ) : (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="tw-w-full tw-h-40 tw-object-contain"
          />
        )}
        <p className="tw-mt-2 tw-text-xl tw-font-bold tw-text-gray-900">
          ${loading ? "..." : product.price}
        </p>
        <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
          {loading ? "Loading rating..." : `Rating: ${product.rating}`}
        </p>
        <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
          {loading
            ? "Loading stock..."
            : `${product.stock} ${product.availabilityStatus}`}
        </p>
      </CardContent>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CardFooter
          className={`tw-flex ${
            expanded
              ? "tw-flex-col tw-items-start tw-gap-4"
              : "tw-justify-between tw-items-center"
          } tw-flex-grow`}
        >
          {expanded && (
            <CollapsibleContent className="tw-w-full tw-text-left">
              {loading ? (
                <p className="tw-text-gray-600">Loading description...</p>
              ) : (
                <p className="tw-text-gray-600">{product.description}</p>
              )}
            </CollapsibleContent>
          )}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600"
          >
            Add To Cart
          </Button>
          <CollapsibleTrigger
            className="tw-text-blue-500 hover:tw-text-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            {expanded ? "Show Less" : "Show More"}
          </CollapsibleTrigger>
        </CardFooter>
      </Collapsible>
    </Card>
  );
}
