const fieldType = "collectionlink"

// map the entry CollectionLink fields to link to the asset node
// the important part is the `___NODE`.
function composeEntryFields(fields, allFields, entry) {
return fields.reduce((acc, fieldname) => {
    const key = fieldname + "___NODE";
    const newAcc = {
    ...acc,
    [key]: entry[fieldname]._id
    };
    return newAcc;
}, {});
}

module.exports = {
    fieldType,
    composeEntryFields
}