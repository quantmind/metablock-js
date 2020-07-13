import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getBlock } from "@metablock/core";
import { AuthStore } from "@metablock/store";
import React from "react";
import Link from "../components/Link";
import { CheckBoxField, FormErrorMessage, TextField, useForm } from "../forms";
import AppForm from "../views/AppForm";

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
  const { authStore, onSuccess, Header = DefaultHeader } = props;
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

  if (form.success) return onSuccess();

  return (
    <AppForm>
      <Header />
      {form.errorMessage ? (
        <FormErrorMessage paragraph>{form.errorMessage}</FormErrorMessage>
      ) : null}
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
        <Grid container>
          <Grid item xs>
            <Link to={block.forgot_password_url} variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={block.signup_url} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AppForm>
  );
};

export default SignIn;
