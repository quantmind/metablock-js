# Metablock React

React components, views and utilities for building metablocks.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Components](#components)
  - [NoSsr](#nossr)
  - [Header](#header)
  - [Image](#image)
- [Forms](#forms)
  - [FormFromSchema](#formfromschema)
  - [SchemaRegistry](#schemaregistry)
- [Hooks](#hooks)
  - [useIntersectionObserver](#useintersectionobserver)
  - [useWindowSize](#usewindowsize)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Components

### NoSsr

Disable server-side rendering

```js
import { NoSsr } from "@metablock/react";
<NoSsr>...</NoSsr>;
```

This is useful for private/login-protected pages for example.

### Header

```js
import {Header} from "@metablock/react";
<Header paddingTop={1}, paddingBottom={1}/>
```

### Image

Progressively load background images

## Hooks

### useIntersectionObserver

Originally from [montezume/medium-style-progressively-loaded-images](https://github.com/montezume/medium-style-progressively-loaded-images) repo.
This hook allows to progressively load images.

### useWindowSize

### useForm

A hook for managing Form submission workflow and optionally for rendering form fields

```typescript
import { useForm } from "@metablock/react";

const form = useForm({
  handleSubmit,
  defaultValues,
  fieldCallback
});
```

The `handleSubmit` function is an async function for handling form submissions, `defaultValues` are the initial/default values of the form and `fieldCallback` is an optional function for customizing props of form fields.

## Forms

The library has a tooling for rending Forms specified via JSON schema.

### FormFromSchema

The entrypoint component for rendring froms from JSON schema

```js
import {FormFromSchema, useForm} from "@metablock/react";

<FormFromSchema form={form} schema={...} data={...} callback={inputCallback} {...extraProps}/>
```

The `schema` is a valid subset of the [JSON schema](https://json-schema.org/). For example a simple name input can be defined as:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3,
      "description": "Please enter your name",
      "format": "optional format"
    }
  }
}
```

The optional `callback` function can be used to further customize the UI. The signature is

```typescript
const callback = (name: str, extraProps: Record<string, any>): Record<string, any> => {
  return props;
}
```

where `name` is the input name and `extraProps` are the additional props passed to the original `FormFromSchema` component.

### SchemaRegistry

This is a global object which controls how form fields are rendered. By defaults it provide the basic input fields, but it can be extended or overwritten if required.

```js
import { SchemaRegistry } from "@metablock/react";

SchemaRegistry.set("string", StringSchema);
SchemaRegistry.set("boolean", BooleanSchema);
SchemaRegistry.set("integer", NumberSchema);
SchemaRegistry.set("number", NumberSchema);
SchemaRegistry.set("object", ObjectSchema);
```

## CrudForm

This is a higher level component to render Forms with side actions. It uses the `FormFromSchema` component in conjunction with the [useForm](#useform) hook.
