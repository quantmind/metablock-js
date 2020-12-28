import { makeStyles } from "@material-ui/core/styles";
import { Notebook } from "@metablock/notebook";
import clsx from "clsx";
import React from "react";
import { SchemaEntryProps } from "./interfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
  },
  error: {
    border: `1px solid ${theme.palette.error.dark}`,
  },
}));

const EditorSchema = (props: SchemaEntryProps) => {
  const { form, name, schema } = props;
  const classes = useStyles();
  const notebook = React.useRef<Notebook>();
  const [error, setError] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>();
  const bits = schema.format ? schema.format.split(":") : [];
  const mode = bits.length === 2 ? bits[1] : "html";

  const events = {
    change: (cm: any) => {
      const text = cm.getValue();
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

  return (
    <div
      className={clsx({ [classes.root]: !error, [classes.error]: error })}
      ref={setRef}
    ></div>
  );
};

export default EditorSchema;
