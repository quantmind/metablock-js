import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import { getBlock, urlQuery } from "@metablock/core";
import React from "react";
import { useAsync } from "react-use";
import Link from "../components/Link";
import { CheckBoxField, FormErrorMessage, TextField, useForm } from "../forms";
import AppForm from "../views/AppForm";
import NotFound from "../views/NotFound";
import Icons from "./Icons";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  provider: {
    margin: theme.spacing(0, 0, 2),
  },
}));

const DefaultHeader = () => (
  <Typography component="h1" variant="h5" paragraph>
    Sign in
  </Typography>
);

const SignIn = (props: any) => {
  const classes = useStyles();
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
        <form className={classes.form} onSubmit={form.onSubmit()} noValidate>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
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
          className={classes.provider}
          href={d.url}
        >
          Sign in with {d.name}
        </Button>
      ))}
      {account.password ? (
        <Box pt={2}>
          <Grid container>
            <Grid item xs>
              <Link
                to={block.plugins.account.forgot_password_url}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={block.plugins.account.signup_url} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </AppForm>
  );
};

export default SignIn;
