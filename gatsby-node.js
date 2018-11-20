const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

/* eslint no-console: "off" */

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Blog") {
    const slug = `/recipe/${_.kebabCase(node.entry.title_slug)}`;
    createNodeField({ node, name: "slug", value: slug });
  }

  if (node.internal.type === "Post") {
    const slug = `/blog/${_.kebabCase(node.entry.title_slug)}`;
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.jsx");
    const recipePage = path.resolve("src/templates/recipe.jsx");
    const tagPage = path.resolve("src/templates/tag.jsx");
    // const categoryPage = path.resolve("src/templates/category.jsx");
    resolve(
      graphql(`
        {
          allBlog {
            edges {
              node {
                entry {
                  title_slug
                  tags
                }
                fields {
                  slug
                }
              }
            }
          }
          allPost {
            edges {
              node {
                entry {
                  title_slug
                  tags
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const tagSet = new Set();
        // const categorySet = new Set();
        result.data.allBlog.edges.forEach(edge => {
          const { slug } = edge.node.fields;

          if (edge.node.entry.tags) {
            edge.node.entry.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          // if (edge.node.entry.category) {
          //   categorySet.add(edge.node.entry.category);
          // }

          createPage({
            path: slug,
            component: recipePage,
            context: {
              slug
            }
          });
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/recipe/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        // const categoryList = Array.from(categorySet);
        // categoryList.forEach(category => {
        //     createPage({
        //         path: `/categories/${_.kebabCase(category)}/`,
        //         component: categoryPage,
        //         context: {
        //             category
        //         }
        //     });
        // });

        const tagSetBlog = new Set();
        result.data.allPost.edges.forEach(edge => {
          const { slug } = edge.node.fields;

          if (edge.node.entry.tags) {
            edge.node.entry.tags.forEach(tag => {
              tagSetBlog.add(tag);
            });
          }

          // if (edge.node.entry.category) {
          //   categorySet.add(edge.node.entry.category);
          // }

          createPage({
            path: slug,
            component: postPage,
            context: {
              slug
            }
          });
        });

        const tagListBlog = Array.from(tagSetBlog);
        tagListBlog.forEach(tag => {
          createPage({
            path: `/blog/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });
      })
    );
  });
};
