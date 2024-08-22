"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export function Rating({ value, readOnly, precision }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    if (value >= starValue)
      return <FaStar key={index} className="tw-text-yellow-500" />;
    if (value >= starValue - precision)
      return <FaStarHalfAlt key={index} className="tw-text-yellow-500" />;
    return <FaRegStar key={index} className="tw-text-yellow-500" />;
  });

  return <div className="tw-flex">{stars}</div>;
}
