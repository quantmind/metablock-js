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
  SchemaEntry,
  unFlattenData,
  useForm,
} from "../forms";
import { useStores } from "../store";
import { Page } from "../views";

type SchemaPromiseFunction = () => Promise<SchemaEntry>;

interface CrudFormProps {
  schema: SchemaPromiseFunction;
  [key: string]: any;
}

interface InnerFormProps {
  schema: SchemaEntry;
  [key: string]: any;
}

const CrudForm = (props: CrudFormProps) => {
  const { title, schema, maxWidth = "md", ...extra } = props;
  const result = useAsync(schema);
  const { loading, value } = result;
  return title ? (
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
            {loading ? null : (
              <InnerForm {...extra} schema={value as SchemaEntry} />
            )}
          </CardContent>
        </Card>
      </Container>
    </Page>
  ) : loading ? null : (
    <InnerForm {...extra} schema={value as SchemaEntry} />
  );
};

const InnerForm = (props: InnerFormProps) => {
  const {
    schema,
    defaults,
    submit,
    fieldCallback,
    changesOnly = true,
    label = "submit",
    successMessage = "Success",
    ...extra
  } = props;
  const stores = useStores();
  const { messageStore } = stores;

  const form = useForm({
    defaultValues: flattenData(schema, defaults),
    fieldCallback: fieldCallback,
    handleSubmit: async (
      formData: Record<string, any>,
      changedData: Record<string, any>
    ) => {
      const body = unFlattenData(changesOnly ? changedData : formData);
      try {
        await submit(stores, body);
        messageStore.success(successMessage, 3000);
      } catch (errors: any) {
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
      <FormFromSchema form={form} schema={schema} {...extra} />
      <FormControl margin="normal">
        <Button type="submit" variant="contained" color="primary">
          {label}
        </Button>
      </FormControl>
    </form>
  );
};

export default CrudForm;
