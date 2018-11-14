const _ = require("lodash");
const crypto = require("crypto");

const fieldType = "markdown";

const digest = data =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`);

function createTextNode(node, key, text) {
  const str = _.isString(text) ? text : ` `;
  const textNode = {
    id: `${node._id}_${key}_TextNode`,
    parent: node._id,
    children: [],
    internal: {
      type: _.camelCase(`${key} TextNode`),
      mediaType: `text/markdown`,
      content: str,
      contentDigest: digest(str)
    }
  };

  return textNode;
}

function composeEntryFields(fields, allFields, entry, { createNode }) {
  return fields.reduce((acc, fieldname) => {
    const node = createTextNode(entry, fieldname, entry[fieldname]);
    createNode(node);

    const transformed = {
      raw: entry[fieldname],
      markdown___NODE: node.id
    };

    return {
      ...acc,
      [fieldname]: transformed
    };
  }, {});
}

module.exports = {
  fieldType,
  composeEntryFields
};
