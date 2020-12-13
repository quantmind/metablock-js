import { Notebook } from "@metablock/notebook";
import React from "react";
import { SchemaEntryProps } from "./interfaces";

const MODE: Record<string, string> = { html: "htmlmixed" };

const EditorSchema = (props: SchemaEntryProps) => {
  const { form, name, schema } = props;
  const notebook = React.useRef<Notebook>(new Notebook()).current;
  const ref = React.useRef<HTMLDivElement>();
  const bits = schema.format ? schema.format.split(":") : [];
  const language = bits.length === 2 ? bits[1] : "html";
  const mode = MODE[language] || language;

  const events = {
    change: (cm: any) => {
      const text = cm.getValue();
      if (form && name) form.setValue(name, text);
    },
  };

  const setRef = async (element: HTMLDivElement) => {
    ref.current = element;
    const text = form && name ? form.data[name] : "";
    await notebook.edit(text, element, { mode, events });
  };
  return <div ref={setRef}></div>;
};

export default EditorSchema;
