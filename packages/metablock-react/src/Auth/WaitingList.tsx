import { getBlock, urlQuery } from "@metablock/core";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAsync } from "react-use";
import { FormErrorMessage, TextField, useForm } from "../Forms";
import AppForm from "../views/AppForm";
import NotFound from "../views/NotFound";

const DefaultHeader = () => (
  <Typography component="h1" variant="h5" paragraph>
    Get early Access
  </Typography>
);

const WaitingList = (props: any) => {
  const block = getBlock();
  const account = block.plugins.account;
  const {
    authStore,
    onSuccess,
    Header = DefaultHeader,
    submitText = "Get early Access",
  } = props;
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

  return (
    <AppForm>
      <Header />
      {form.errorMessage ? (
        <FormErrorMessage paragraph>{form.errorMessage}</FormErrorMessage>
      ) : null}
      <form onSubmit={form.onSubmit()} noValidate>
        <TextField
          form={form}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Enter Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {submitText}
        </Button>
      </form>
    </AppForm>
  );
};

export default WaitingList;
