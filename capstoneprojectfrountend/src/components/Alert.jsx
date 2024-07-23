import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

// Component for displaying confirmation/notification alerts
export default function SimpleAlert({ message, severity, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

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
