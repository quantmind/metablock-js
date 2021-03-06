import React from "react";

interface FormOptions {
  defaultValues?: Record<string, any>;
  handleSubmit: (
    data: Record<string, any>,
    dirty: Record<string, any>
  ) => Promise<void>;
}

export class FormData {
  defaults: Record<string, any>;
  data: Record<string, any>;
  dirty: Record<string, any>;
  errors: Map<string, string>;
  errorMessage: string;
  handleSubmit: (
    data: Record<string, any>,
    dirty: Record<string, any>
  ) => Promise<void>;
  success: boolean;
  _render: any;

  constructor(render: any, options: FormOptions) {
    const { defaultValues = {}, handleSubmit } = options;
    this.handleSubmit = handleSubmit;
    this._render = render;
    this.defaults = { ...defaultValues };
    this.data = { ...defaultValues };
    this.dirty = {};
    this.errors = new Map();
    this.errorMessage = "";
    this.success = false;
  }

  onChange() {
    return async (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      if (e.target.type === "checkbox") this.setValue(name, e.target.checked);
      else this.setValue(name, e.target.value);
    };
  }

  setValue(name: string, value: any) {
    this.data[name] = value;
    if (this.defaults[name] === this.data[name]) delete this.dirty[name];
    else this.dirty[name] = this.data[name];
    if (this.errors.has(name)) {
      this.errors.delete(name);
      this._render({});
    }
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

const useForm = (options: FormOptions) => {
  const [, render] = React.useState();
  const form = React.useRef(new FormData(render, options));
  return form.current;
};

export default useForm;
