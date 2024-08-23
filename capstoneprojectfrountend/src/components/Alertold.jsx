import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

// Component for displaying confirmation/notification alerts
export default function SimpleAlert({ message, severity, onClose }) {
  // Automatically close alert after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call the onClose function to hide the alert
    }, 3000);

    // Clean up the timer then component unmounts or onClose changes
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: "9999",
      }}
    >
      {/* Display an alert popup with a message and a severity level recieved from props */}
      <Alert
        variant="filled"
        icon={<CheckIcon fontSize="inherit" />}
        severity={severity}
      >
        {/* Display the message */}
        {message}
      </Alert>
    </div>
  );
}
