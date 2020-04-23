const fieldType = "_other";

function composeEntryFields(fields, allFields, entry, parentNodeId) {
  return fields.reduce(
    (acc, fieldname) => ({
      ...acc,
      [fieldname]: entry[fieldname],
    }),
    {}
  );
}

module.exports = {
  fieldType,
  composeEntryFields,
};
