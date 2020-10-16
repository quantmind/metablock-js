export const unFlattenData = (
  data: Record<string, any>
): Record<string, any> => {
  return Object.keys(data).reduce(
    (record: Record<string, any>, name: string) => {
      const bits = name.split("::");
      let rec = record;
      for (let i = 0; i < bits.length - 1; ++i) {
        const key = bits[i];
        if (rec[key] === undefined) rec[key] = {};
        rec = rec[key];
      }
      rec[bits[bits.length - 1]] = data[name];
      return record;
    },
    {}
  );
};

export const flattenData = (
  schema?: any,
  data?: any,
  prefix?: string
): Record<string, any> => {
  const flatData = {};
  if (!schema) return flatData;
  if (schema.properties) {
    const keys = new Set(Object.keys(data || {}));
    Object.keys(schema.properties).reduce(
      (record: Record<string, any>, name: string) => {
        const prop: any = schema.properties[name];
        const propData: any = keys.has(name) ? data[name] : prop.default;
        name = propName(name, prefix);
        if (prop.type === "object")
          record = { ...record, ...flattenData(prop, propData, name) };
        else if (propData !== undefined) record[name] = propData;
        return record;
      },
      flatData
    );
  }
  // additional properties
  if (schema.additionalProperties && data) {
    Object.keys(data).reduce((record: Record<string, any>, name: string) => {
      const propData: any = data[name];
      if (prefix) name = `${prefix}::${name}`;
      record[name] = propData;
      return record;
    }, flatData);
  }
  return flatData;
};

export const propName = (name: string, prefix = "") => {
  return prefix ? `${prefix}::${name}` : name;
};
