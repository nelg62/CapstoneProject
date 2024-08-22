"use client";

import { useState, useEffect } from "react";
import { Avatar } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Rating } from "@/components/Rating"; // Import the custom Rating component

export default function AlignItemsList({ product }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product && product.reviews) {
      setLoading(false);
    }
  }, [product]);

  return (
    <div className="tw-p-4 tw-bg-white tw-shadow-md tw-rounded-md">
      <ul className="tw-divide-y tw-divide-gray-200">
        {product.reviews.map((review, index) => (
          <li
            key={index}
            className="tw-py-4 tw-flex tw-items-start tw-space-x-4"
          >
            {loading ? (
              <Skeleton className="tw-w-10 tw-h-10 tw-rounded-full" />
            ) : (
              <Avatar alt={review.reviewerName} src="" className="w-10 h-10" />
            )}
            <div className="tw-flex-1">
              {loading ? (
                <Skeleton className="tw-mb-2" />
              ) : (
                <h3 className="tw-font-semibold tw-text-lg tw-mb-1">
                  {review.reviewerName}
                </h3>
              )}

              {loading ? (
                <Skeleton className="tw-mb-2" />
              ) : (
                <div className="tw-flex tw-items-center tw-space-x-2 tw-mb-2">
                  <Rating value={review.rating} readOnly precision={0.5} />
                </div>
              )}

              {loading ? (
                <Skeleton className="tw-mb-2" />
              ) : (
                <p className="tw-text-gray-600 tw-mb-2">{review.comment}</p>
              )}

              {loading ? (
                <Skeleton className="tw-mb-2" />
              ) : (
                <time className="tw-text-gray-400 tw-text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </time>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
