import { Notebook } from "@metablock/notebook";
import Box from "@mui/material/Box";
import React from "react";
import { SchemaEntryProps } from "./interfaces";

const EditorSchema = (props: SchemaEntryProps) => {
  const { form, name, schema } = props;
  const notebook = React.useRef<Notebook>();
  const [error, setError] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>();
  const bits = schema.format ? schema.format.split(":") : [];
  const mode = bits.length === 2 ? bits[1] : "html";

  const events = {
    change: (text: string) => {
      if (form && name) {
        try {
          const data = mode === "json" ? JSON.parse(text) : text;
          form.setValue(name, data);
          setError(false);
        } catch (err) {
          setError(true);
        }
      }
    },
  };

  const setRef = async (element: HTMLDivElement) => {
    if (element) {
      ref.current = element;
      if (!notebook.current) {
        notebook.current = new Notebook();
        let text = (form && name ? form.data[name] : "") || "";
        if (mode === "json" && text.constructor !== String)
          text = JSON.stringify(text, null, 2);
        await notebook.current.edit(text, element, { mode, events });
      }
    }
  };

  const borderColor = error ? "error.dark" : "divider";

  return (
    <Box
      sx={{ border: 1, borderColor, borderRadius: "4px" }}
      ref={setRef}
    ></Box>
  );
};

export default EditorSchema;
