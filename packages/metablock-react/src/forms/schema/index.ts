import BooleanSchema from "./Boolean";
import NumberSchema from "./Number";
import ObjectSchema from "./Object";
import SchemaRegistry from "./registry";
import StringSchema from "./String";
export * from "./data";
export { default as FormFromSchema } from "./FormFromSchema";
export * from "./interfaces";
export {
  BooleanSchema,
  ObjectSchema,
  SchemaRegistry,
  StringSchema,
  NumberSchema,
};

SchemaRegistry.set("string", StringSchema);
SchemaRegistry.set("boolean", BooleanSchema);
SchemaRegistry.set("integer", NumberSchema);
SchemaRegistry.set("number", NumberSchema);
SchemaRegistry.set("object", ObjectSchema);
