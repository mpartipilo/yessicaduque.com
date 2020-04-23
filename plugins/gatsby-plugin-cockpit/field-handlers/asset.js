const fieldType = "asset";

// map the entry image fields to link to the asset node
// the important part is the `___NODE`.
function composeEntryFields(
  fields,
  allFields,
  entry,
  parentNodeId,
  { getFileAsset }
) {
  return fields.reduce((acc, fieldname) => {
    entry[fieldname].colors = entry[fieldname].colors.map((e) => "" + e);

    if (entry[fieldname].path != null) {
      let fileLocation = getFileAsset(entry[fieldname].path);

      entry[fieldname].localFile___NODE = fileLocation;
    }

    return {
      ...acc,
      [fieldname]: entry[fieldname],
    };
  }, {});
}

module.exports = {
  fieldType,
  composeEntryFields,
};
