import { getBlock } from "@metablock/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Link from "../Components/Link";
import { CheckBoxField, TextField, useForm } from "../Forms";
import AppForm from "../views/AppForm";

const SignUp = (props: any) => {
  const block = getBlock();
  const { onSubmit, color = "primary" } = props;
  const form = useForm({ handleSubmit: onSubmit });

  return (
    <AppForm>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={form.onSubmit()} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              form={form}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              color={color}
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              form={form}
              variant="outlined"
              required
              fullWidth
              color={color}
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              form={form}
              variant="outlined"
              required
              fullWidth
              color={color}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              form={form}
              variant="outlined"
              required
              fullWidth
              color={color}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <CheckBoxField
              form={form}
              fullWidth
              margin="normal"
              name="remember"
              color={color}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color={color}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={block.plugins.account.login_url} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AppForm>
  );
};

export default SignUp;
