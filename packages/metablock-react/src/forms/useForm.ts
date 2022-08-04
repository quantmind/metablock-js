import isEqual from "lodash.isequal";
import React from "react";

export type FieldCallbackType = (
  name: string,
  props: Record<string, any>
) => Record<string, any>;

export type FormSubmitType = (
  data: Record<string, any>,
  dirty: Record<string, any>
) => Promise<void>;

interface FormOptions {
  handleSubmit: FormSubmitType;
  defaultValues?: Record<string, any>;
  fieldCallback?: FieldCallbackType;
}

const passThrough = (ignored: string, props: Record<string, any>) => props;

export class FormData {
  defaults: Record<string, any>;
  data: Record<string, any>;
  dirty: Record<string, any>;
  errors: Map<string, string>;
  errorMessage: string;
  success: boolean;
  handleSubmit: FormSubmitType;
  fieldCallback: FieldCallbackType;
  private _render: any;

  constructor(render: any, options: FormOptions) {
    const { defaultValues = {}, fieldCallback, handleSubmit } = options;
    this.handleSubmit = handleSubmit;
    this._render = render;
    this.defaults = { ...defaultValues };
    this.data = { ...defaultValues };
    this.dirty = {};
    this.errors = new Map();
    this.errorMessage = "";
    this.success = false;
    this.fieldCallback = fieldCallback || passThrough;
  }

  onChange() {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      if (e.target.type === "checkbox") this.setValue(name, e.target.checked);
      else this.setValue(name, e.target.value);
    };
  }

  setValue(name: string, value: any, render = true): boolean {
    this.data[name] = value;
    if (this.defaults[name] === this.data[name]) delete this.dirty[name];
    else this.dirty[name] = this.data[name];
    if (this.errors.has(name)) {
      this.errors.delete(name);
      if (render) this._render({});
      return !render;
    }
    return false;
  }

  setValues(data: Record<string, any>, render = true): boolean {
    let dorender = false;
    Object.keys(data).forEach((key: string) => {
      dorender = this.setValue(key, data[key], false) || dorender;
    });
    if (dorender) {
      if (render) this._render({});
      return !render;
    }
    return false;
  }

  setNewState(data: Record<string, any>, render = false) {
    this.defaults = { ...data };
    this.data = { ...data };
    this.dirty = {};
    this.errors = new Map();
    this.errorMessage = "";
    this.success = false;
    if (render) this._render({});
  }

  setErrors(records: Array<any>, clear = true) {
    if (clear) this.clearErrors();
    records.forEach((e) => this.errors.set(e.field, e.message));
    this._render({});
  }

  setErrorMessage(message: string, clear = true) {
    if (clear) this.clearErrors();
    this.errorMessage = message;
    this._render({});
  }

  setSuccess() {
    this.success = true;
    this._render({});
  }

  helperText(name: string, text = "") {
    if (this.errors.has(name)) return this.errors.get(name);
    return text;
  }

  clearErrors() {
    this.errorMessage = "";
    this.errors.clear();
  }

  onSubmit() {
    return async (e?: React.BaseSyntheticEvent): Promise<void> => {
      if (e) {
        e.preventDefault();
        e.persist();
      }
      await this.handleSubmit(this.data, this.dirty);
    };
  }
}

const useForm = (options: FormOptions, deps?: any[]) => {
  const [, render] = React.useState();
  const form = new FormData(render, options);
  const ref = React.useRef({ deps, form });
  if (!isEqual(ref.current.deps, deps)) ref.current = { deps, form };
  return ref.current.form;
};

export default useForm;
