const fieldHandlers = require("../field-handlers")
const fields = require("./fields.json")

var fieldsByType = fields.map(fieldHandlers.getAllFields)

console.log(JSON.stringify(fieldsByType))