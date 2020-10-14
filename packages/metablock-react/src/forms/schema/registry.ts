import React from "react";
import { SchemaEntryProps } from "./interfaces";

const SchemaRegistry = new Map<string, React.FC<SchemaEntryProps>>();

export default SchemaRegistry;
