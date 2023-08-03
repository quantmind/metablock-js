import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAsync } from "react-use";
import { Page } from "../views";
import FormErrorMessage from "./ErrorMessage";
import { flattenData, FormFromSchema, SchemaEntry } from "./schema";
import useForm, { FieldCallbackType, FormData } from "./useForm";

type SchemaPromiseFunction = () => Promise<SchemaEntry>;

export type CrudFormSubmitType = (
  body: Record<string, any>,
  changed: Record<string, any>
) => Promise<any>;

interface CrudFormBaseProps {
  submit: CrudFormSubmitType;
  fieldCallback?: FieldCallbackType;
  defaults?: any;
  onSuccess?: (result: any, form: FormData) => void;
  onError422?: (errors: any, form: FormData) => void;
  onError?: (error: string, form: FormData) => void;
  [key: string]: any;
}

interface CrudFormProps extends CrudFormBaseProps {
  schema: SchemaPromiseFunction;
  title?: string;
}

interface InnerFormProps extends CrudFormBaseProps {
  schema: SchemaEntry;
}

export const CrudForm = (props: CrudFormProps) => {
  const { title, schema, maxWidth = null, ...extra } = props;
  const { loading, value } = useAsync(schema);
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
    <Container maxWidth={maxWidth}>
      <InnerForm {...extra} schema={value as SchemaEntry} />
    </Container>
  );
};

const InnerForm = (props: InnerFormProps) => {
  const {
    schema,
    defaults,
    submit,
    fieldCallback,
    label = "submit",
    onSuccess = () => {},
    onError422 = (errors: any, form: FormData) => {
      const fields = new Map<string, string>(
        errors.errors.map((e: any) => [e.field, e.message])
      );
      form.setErrors(errors.errors, true);
      if (fields.has("config"))
        form.setErrorMessage(fields.get("config") || "", false);
    },
    onError = (error: string) => {},
    ...extra
  } = props;

  const form = useForm({
    defaultValues: flattenData(schema, defaults),
    fieldCallback: fieldCallback,
    handleSubmit: async (
      formData: Record<string, any>,
      changedData: Record<string, any>
    ) => {
      try {
        const result = await submit(formData, changedData);
        onSuccess(result, form);
      } catch (errors: any) {
        if (errors.status === 422) {
          onError422(errors, form);
        } else
          onError(
            errors.message ||
              `Could not update parameters: status code ${errors.status}`,
            form
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
