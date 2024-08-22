"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DotsMobileStepper({ product }) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  const maxSteps = product.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, maxSteps - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-mt-4">
      {loading ? (
        <Skeleton className="tw-w-full tw-h-72" />
      ) : (
        <Card className="tw-w-full tw-max-w-md tw-mx-auto">
          <img
            src={product.images[activeStep]}
            alt={`${product.title} image ${activeStep + 1}`}
            className="tw-w-full tw-h-72 tw-object-contain"
          />
        </Card>
      )}
      <div className="tw-flex tw-justify-between tw-w-full tw-mt-2">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="tw-bg-gray-300 tw-text-gray-700 hover:tw-bg-gray-400"
        >
          &lt; Back
        </Button>
        <div className="tw-flex tw-items-center tw-space-x-2">
          {Array.from({ length: maxSteps }).map((_, index) => (
            <div
              key={index}
              className={`tw-w-2 tw-h-2 tw-rounded-full ${
                index === activeStep ? "tw-bg-blue-600" : "tw-bg-gray-300"
              }`}
            />
          ))}
        </div>
        <Button
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          className="tw-bg-gray-300 tw-text-gray-700 hover:tw-bg-gray-400"
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
}
