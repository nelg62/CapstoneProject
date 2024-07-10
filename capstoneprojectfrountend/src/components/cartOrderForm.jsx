import { Box, Button, Paper, TextField } from "@mui/material";

export default function CartOrderForm({ cart }) {
  return (
    <Box
      component={"form"}
      sx={{
        width: "100%",
        marginTop: "10px",
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <TextField label="First Name" sx={{ margin: "6px" }} />
        <TextField label="Last Name" sx={{ margin: "6px" }} />
        <TextField label="Last Name" sx={{ margin: "6px" }} />
      </Paper>
      <Paper>
        <Button type="submit" variant="contained" sx={{ width: "100%" }}>
          CheckOut
        </Button>
      </Paper>
    </Box>
  );
}
