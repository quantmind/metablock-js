import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useAsync } from "react-use";
import {
  flattenData,
  FormErrorMessage,
  FormFromSchema,
  unFlattenData,
  useForm,
} from "../forms";
import { useStores } from "../store";
import { Page } from "../views";

const CrudForm = (props: any) => {
  const { title, schema, maxWidth = "md", ...extra } = props;
  const result = useAsync(schema);
  return (
    <Page title={title}>
      <Container maxWidth={maxWidth}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h6" align="center">
                {title}
              </Typography>
            }
          />
          <CardContent>
            {result.loading ? null : (
              <InnerForm {...extra} schema={result.value} />
            )}
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

const InnerForm = (props: any) => {
  const {
    schema,
    defaults,
    submit,
    label = "submit",
    successMessage = "Success",
  } = props;
  const { messageStore } = useStores();

  const form = useForm({
    defaultValues: flattenData(schema, defaults),
    handleSubmit: async (
      formData: Record<string, any>,
      changedData: Record<string, any>
    ) => {
      const body = unFlattenData(changedData);
      try {
        await submit(body);
        messageStore.success(successMessage, 3000);
      } catch (errors) {
        if (errors.status === 422) {
          const fields = new Map<string, string>(
            errors.errors.map((e: any) => [e.field, e.message])
          );
          form.setErrors(errors.errors, true);
          if (fields.has("config"))
            form.setErrorMessage(fields.get("config") || "", false);
        } else
          messageStore.error(
            errors.message ||
              `Could not update parameters: status code ${errors.status}`
          );
      }
    },
  });

  return (
    <form onSubmit={form.onSubmit()} noValidate>
      {form.errorMessage ? (
        <FormErrorMessage paragraph>{form.errorMessage}</FormErrorMessage>
      ) : null}
      <FormFromSchema form={form} schema={schema} />
      <FormControl margin="normal">
        <Button type="submit" variant="contained" color="primary">
          {label}
        </Button>
      </FormControl>
    </form>
  );
};

export default CrudForm;
