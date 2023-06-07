import { styled } from "@mui/system";
import React from "react";

const Outer = styled("fieldset")({
  border: 0,
  padding: 0,
  paddingBottom: "theme.spacing(2)",
});

const Legend = styled("legend")({
  borderBottom: `1px solid palette.divider`,
  padding: "var(--space-s)",
  width: "100%",
});

const Fieldset = (props: any) => {
  const { legend, children } = props;

  return (
    <Outer>
      <Legend>{legend}</Legend>
      {children}
    </Outer>
  );
};

export default Fieldset;
