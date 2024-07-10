import { Box, Button, TextField } from "@mui/material";

export default function CartOrderForm({ cart }) {
  return (
    <Box
      component={"form"}
      sx={{
        width: "100%",
        marginTop: "10px",
        marginLeft: "10px",
        border: "solid 1px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField label="First Name" sx={{ margin: "6px" }} />
      <TextField label="Last Name" sx={{ margin: "6px" }} />
      <Button type="submit" variant="contained">
        CheckOut
      </Button>
    </Box>
  );
}
