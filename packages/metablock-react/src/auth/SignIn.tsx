import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getBlock } from "@metablock/core";
import { AuthStore } from "@metablock/store";
import { parseUrl, stringifyUrl } from "query-string";
import React from "react";
import Link from "../components/Link";
import { CheckBoxField, FormErrorMessage, TextField, useForm } from "../forms";
import { useFetch } from "../hooks";
import AppForm from "../views/AppForm";
import NotFound from "../views/NotFound";
import Icons from "./icons";

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

interface SignInProps {
  authStore: AuthStore;
  onSuccess: React.FC;
  Header?: React.FC;
}

const SignIn = (props: any) => {
  const classes = useStyles();
  const block = getBlock();
  const account = block.plugins.account;
  const { authStore, onSuccess, Header = DefaultHeader } = props;
  const loc = parseUrl(window.location.href);
  const { jwt } = loc.query;
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
  const integrationUrls = useFetch(async () => {
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
      stringifyUrl({
        url: "/.api/integration/urls",
        query: { reason: "signin", redirect: loc.url },
      })
    );
    return response.data;
  });
  if (!account) return <NotFound />;
  if (form.success) return onSuccess();
  if (!integrationUrls) return null;

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
