import { getBlock, urlQuery } from "@metablock/core";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAsync } from "react-use";
import Link from "../Components/Link";
import { CheckBoxField, FormErrorMessage, TextField, useForm } from "../Forms";
import AppForm from "../views/AppForm";
import NotFound from "../views/NotFound";
import Icons from "./Icons";

const DefaultHeader = () => (
  <Typography component="h1" variant="h5" paragraph>
    Sign in
  </Typography>
);

const SignIn = (props: any) => {
  const block = getBlock();
  const account = block.plugins.account;
  const { authStore, onSuccess, Header = DefaultHeader } = props;
  const loc = new URL(window.location.href);
  const jwt = loc.searchParams.get("jwt");
  const form = useForm({
    handleSubmit: async (data: Record<string, any>) => {
      await authStore.login(data);
      const errors = authStore.errors;
      if (errors) {
        if (errors.status === 422) form.setErrors(errors.errors, true);
        else form.setErrorMessage(errors.message || "Could not sign in");
      } else form.setSuccess();
    },
  });
  const result = useAsync(async () => {
    if (!account) return;
    if (jwt) {
      await authStore.setJwt(jwt);
      const errors = authStore.errors;
      if (errors) form.setErrorMessage(errors.message || "Could not sign in");
      else {
        form.setSuccess();
        return;
      }
    }
    const response = await authStore.cli.get(
      urlQuery("/.api/integration/urls", {
        reason: "signin",
        redirect: `${loc.origin}${loc.pathname}`,
      })
    );
    return response.data;
  });
  if (!account) return <NotFound />;
  if (form.success) return onSuccess();
  if (result.loading) return null;
  const integrationUrls = result.value as any[];

  return (
    <AppForm>
      <Header />
      {form.errorMessage ? (
        <FormErrorMessage paragraph>{form.errorMessage}</FormErrorMessage>
      ) : null}
      {account.password ? (
        <form onSubmit={form.onSubmit()} noValidate>
          <TextField
            form={form}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            form={form}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <CheckBoxField
            form={form}
            fullWidth
            margin="normal"
            name="remember"
            color="primary"
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      ) : null}
      {integrationUrls.map((d: any) => (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          key={d.name}
          startIcon={Icons[d.name]}
          href={d.url}
        >
          Sign in with {d.name}
        </Button>
      ))}
      {account.password ? (
        <>
          <Typography align="center" variant="caption" pt={2}>
            <Link
              to={block.plugins.account.forgot_password_url}
              variant="body2"
            >
              Forgot password?
            </Link>
          </Typography>
          <Typography align="center" variant="caption" pt={0.5}>
            <Link to={block.plugins.account.signup_url} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Typography>
        </>
      ) : null}
    </AppForm>
  );
};

export default SignIn;
