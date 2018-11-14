const fieldTypes = [
  "image",
  "asset",
  "collectionlink",
  "markdown",
  "gallery"
  //"layout",
]
const fieldHandlers = ["_other"].concat(fieldTypes).map(handler => require("./" + handler));

const getFields = (fields, type) =>
  Object.keys(fields).filter(f => fields[f].type === type);

const getAllFields = fields => {
  const base = { _other: getOtherFields(fields) }

  return fieldTypes.reduce(
    (acc, val) => ({
      ...acc,
      [val]: getFields(fields, val)
    }),
    base
  );
};

const getOtherFields = fields => {
  const keys = Object.keys(fields).filter(
    fieldname => !fieldHandlers.map(f => f.fieldType).includes(fields[fieldname].type)
  );

  const haveSlug = Object.keys(fields)
    .filter(fieldname => fields[fieldname].options && fields[fieldname].options.slug)
    .map(fieldname => `${fieldname}_slug`) || {};

  return keys.concat(haveSlug);
};

const handlers = fieldHandlers.reduce(
  (acc, val) => ({ ...acc, [val.fieldType]: val.composeEntryFields }),
  {}
);

module.exports = {
  fieldTypes: fieldHandlers,
  handlers,
  getAllFields,
  getFields,
  getOtherFields
};
