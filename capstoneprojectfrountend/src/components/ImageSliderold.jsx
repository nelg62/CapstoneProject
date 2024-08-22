import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, CardMedia, Skeleton } from "@mui/material";

export default function DotsMobileStepper({ product }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Set loading to false once the product data is available
    if (product) {
      setLoading(false);
    }
  }, [product]);

  // Determine the maximum number of steps based on the amount of product images
  const maxSteps = product.images.length;

  // Handle next step in the image carousel
  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, maxSteps - 1)
    );
  };

  // Handle previous step in the image carousel
  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <Box sx={{ flexDirection: "column", marginTop: 4 }}>
      {loading ? (
        <Skeleton variant="rectangular" width={500} height={300}></Skeleton>
      ) : (
        // Show Product image depending on active step number
        <CardMedia
          component="img"
          image={product.images[activeStep]}
          alt={`${product.title} image ${activeStep + 1}`}
          sx={{ maxHeight: 600, objectFit: "contain" }}
        />
      )}
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
