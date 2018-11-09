const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

/* eslint no-console: "off" */

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Blog") {
    const slug = `/${_.kebabCase(node.entry.title_slug)}`;
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === "build-javascript") {
    actions.setWebpackConfig({
      plugins: [webpackLodashPlugin]
    });
  }
};
