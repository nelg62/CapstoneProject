import * as React from "react";
import { Check } from "lucide-react"; // Assuming you're using Lucide icons with shadcn
import { cn } from "@/lib/utils"; // Utility to conditionally join class names

// Component for displaying confirmation/notification alerts
export default function SimpleAlert({
  message,
  severity = "success",
  onClose,
}) {
  // Automatically close alert after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call the onClose function to hide the alert
    }, 3000);

    // Clean up the timer when the component unmounts or onClose changes
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="tw-fixed tw-bottom-4 tw-left-4 tw-z-50">
      <div
        className={cn(
          "tw-flex tw-items-center tw-p-4 tw-rounded-md tw-shadow-lg tw-text-white",
          severity === "success" && "tw-bg-green-600",
          severity === "error" && "tw-bg-red-600",
          severity === "warning" && "tw-bg-yellow-600",
          severity === "info" && "tw-bg-blue-600"
        )}
      >
        {/* Icon */}
        <Check className="tw-w-5 tw-h-5 tw-mr-2" />

        {/* Message */}
        <span>{message}</span>
      </div>
    </div>
  );
}
