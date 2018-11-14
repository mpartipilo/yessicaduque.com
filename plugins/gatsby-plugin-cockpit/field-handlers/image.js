const assetFieldHandler = require("./asset")

const fieldType = "image"

module.exports = {
    fieldType,
    composeEntryFields: assetFieldHandler.composeEntryFields
}