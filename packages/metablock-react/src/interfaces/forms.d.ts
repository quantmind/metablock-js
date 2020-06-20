import { ChangeEvent, FormEvent } from "react";

export interface FormEvents {
  onSubmit: (event: FormEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
