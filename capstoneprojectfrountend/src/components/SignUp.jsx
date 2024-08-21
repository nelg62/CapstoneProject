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
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserContext } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const defaultTheme = createTheme();

export default function SignUp() {
  const { SignUpFunction } = useUserContext();

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Signupdata = {
      username: data.get("username"),
      emailId: data.get("email"),
      password: data.get("password"),
    };

    SignUpFunction(Signupdata);
  };

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
      <div className="tw-max-w-md tw-w-full tw-bg-white tw-p-8 tw-rounded-lg tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-justify-center tw-mb-4">
          <Avatar className="tw-w-12 tw-h-12 tw-bg-blue-500 tw-text-white tw-flex tw-items-center tw-justify-center tw-rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="tw-w-6 tw-h-6"
            >
              <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
            </svg>

            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-center tw-mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="tw-mb-4">
            <label
              htmlFor="username"
              className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="given-name"
              autoFocus
              className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 sm:tw-text-sm"
            />
          </div>
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
              className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 sm:tw-text-sm"
            />
          </div>
          <div className="tw-mb-4">
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
              autoComplete="new-password"
              className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 sm:tw-text-sm"
            />
          </div>

          <button
            type="submit"
            className="tw-w-full tw-py-2 tw-px-4 tw-bg-blue-500 tw-text-white tw-font-semibold tw-rounded-lg tw-shadow-sm hover:tw-bg-blue-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500"
          >
            Sign Up
          </button>
          <div className="tw-mt-4 tw-text-sm tw-text-center">
            <a
              href="/login"
              className="tw-text-blue-500 hover:tw-text-blue-600"
            >
              Already have an account? Sign in
            </a>
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
    //         Sign up
    //       </Typography>
    //       <Box
    //         component="form"
    //         noValidate
    //         onSubmit={handleSubmit}
    //         sx={{ mt: 3 }}
    //       >
    //         <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //             {/* Username */}
    //             <TextField
    //               autoComplete="given-name"
    //               name="username"
    //               required
    //               fullWidth
    //               id="username"
    //               label="Username"
    //               autoFocus
    //             />
    //           </Grid>

    //           <Grid item xs={12}>
    //             {/* Email */}
    //             <TextField
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             {/* Password */}
    //             <TextField
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="new-password"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <FormControlLabel
    //               control={
    //                 <Checkbox value="allowExtraEmails" color="primary" />
    //               }
    //               label="I want to receive inspiration, marketing promotions and updates via email."
    //             />
    //           </Grid>
    //         </Grid>
    //         {/* Submit button */}
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign Up
    //         </Button>
    //         <Grid container justifyContent="flex-end">
    //           <Grid item>
    //             {/* Login link to redirect to the login page */}
    //             <Link href="/login" variant="body2">
    //               Already have an account? Sign in
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
  );
}
