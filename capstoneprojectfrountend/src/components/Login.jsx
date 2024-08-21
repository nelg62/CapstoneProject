import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";

const defaultTheme = createTheme();

export default function LogIn() {
  // Destructure functions from user and cart context
  const { LoginFunction } = useUserContext();
  const { GetItemsInCart } = useCartContext();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Extract email and password from form data
    const logindata = {
      emailId: data.get("email"),
      password: data.get("password"),
    };

    // Call login function and fetch items in cart
    await LoginFunction(logindata);
    GetItemsInCart();
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <div className="tw-max-w-sm tw-w-full tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-justify-center tw-mb-4">
          <Avatar className="tw-w-12 tw-h-12 tw-bg-blue-500 tw-text-white tw-flex tw-items-center tw-justify-center tw-rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="tw-w-6 tw-h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clipRule="evenodd"
              />
            </svg>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="tw-mb-4">
            <label
              htmlFor="email"
              className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              autoFocus
              className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 sm:tw-text-sm"
            />
          </div>
          {/* Password */}
          <div className="tw-md-4">
            <label
              htmlFor="password"
              className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              autoFocus
              className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 sm:tw-text-sm"
            />
          </div>
          <div className="tw-flex tw-items-center tw-mb-6"></div>
          <button
            type="submit"
            className="tw-w-full tw-py-2 tw-px-4 tw-bg-blue-500 tw-text-white tw-font-semibold tw-rounded-lg tw-shadow-sm hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500"
          >
            Sign In
          </button>
          <div className="tw-mt-4 tw-text-sm tw-text-center">
            <div className="tw-mt-2">
              <a
                href="/signup"
                className="tw-text-blue-500 hover:tw-text-blue-600"
              >
                {"Don't have an account? Sign Up"}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>

    // <ThemeProvider theme={defaultTheme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <Box
    //         component="form"
    //         onSubmit={handleSubmit}
    //         noValidate
    //         sx={{ mt: 1 }}
    //       >
    //         {/* Email */}
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //         />
    //         {/* Password */}
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //         />
    //         {/* Submit button */}
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="#" variant="body2">
    //               Forgot password?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             {/* Link to signup page  */}
    //             <Link href="/signup" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
  );
}
