const fieldType = "gallery"

function composeEntryFields(fields, allFields, entry, { getFileAsset }) {
    return fields.reduce((acc, fieldname) => {

        var mapped = entry[fieldname].map(e => {
        if (e.path != null) {
            let fileLocation = getFileAsset(e.path);

            return {
            ...e,
            localFile___NODE: fileLocation
            }
        }
        });

        return {
        ...acc,
        [fieldname]: mapped
        };
    }, {});
}

module.exports = {
    fieldType,
    composeEntryFields
}