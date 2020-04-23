const crypto = require("crypto");

const fieldType = "markdown";

function createTextNode(
  node,
  key,
  text,
  createNodeId,
  createContentDigest,
  parentNodeId
) {
  const nodeId = createNodeId(`${node._id}_${key}_TextNode`);
  const textNode = {
    id: nodeId,
    parent: parentNodeId,
    children: [],
    internal: {
      type: `${key}_TextNode`,
      mediaType: `text/markdown`,
      content: text,
      contentDigest: createContentDigest(text),
    },
  };

  return textNode;
}

function composeEntryFields(
  fields,
  allFields,
  entry,
  parentNodeId,
  { createNode, createNodeId, createContentDigest, assetsMap }
) {
  return fields.reduce((acc, fieldname) => {
    const node = createTextNode(
      entry,
      fieldname,
      entry[fieldname],
      createNodeId,
      createContentDigest,
      parentNodeId
    );

    // Replace image links by assets links that can be picked up by gatsby-remark-images

    createNode(node);

    const transformed = {
      raw: entry[fieldname],
      markdown___NODE: node.id,
    };

    return {
      ...acc,
      [fieldname]: transformed,
    };
  }, {});
}

module.exports = {
  fieldType,
  composeEntryFields,
};
