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
  handleSubmit: (
    data: Record<string, any>,
    dirty: Record<string, any>
  ) => Promise<void>;
  success: boolean;
  _render: any;

  constructor(render: any, options: FormOptions) {
    const { defaultValues = {}, handleSubmit } = options;
    this.defaults = { ...defaultValues };
    this.data = { ...defaultValues };
    this.dirty = {};
    this.errors = new Map();
    this.success = false;
    this.handleSubmit = handleSubmit;
    this._render = render;
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

  setErrors(records: Array<any>, clear = true) {
    if (clear) this.errors.clear();
    records.forEach((e) => this.errors.set(e.field, e.message));
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
