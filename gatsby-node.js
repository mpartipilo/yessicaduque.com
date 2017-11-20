const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

/* eslint no-console: "off" */

exports.onCreateNode = ({ node, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators;
    if (node.internal.type === "CockpitBlog") {
        const slug = `/${_.kebabCase(node.properties.title_slug)}`;
        createNodeField({ node, name: "slug", value: slug });
    }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {
        const postPage = path.resolve("src/templates/post.jsx");
        const tagPage = path.resolve("src/templates/tag.jsx");
        // const categoryPage = path.resolve("src/templates/category.jsx");
        resolve(
            graphql(`
                {
                    allCockpitBlog {
                        edges {
                            node {
                                host
                                properties {
                                    title_slug
                                }
                                entry {
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
                const categorySet = new Set();
                result.data.allCockpitBlog.edges.forEach(edge => {
                    const { slug } = edge.node.fields;

                    if (edge.node.entry.tags) {
                        edge.node.entry.tags.forEach(tag => {
                            tagSet.add(tag);
                        });
                    }

                    if (edge.node.entry.category) {
                        categorySet.add(edge.node.entry.category);
                    }

                    createPage({
                        path: slug,
                        component: postPage,
                        context: {
                            slug
                        }
                    });
                });

                const tagList = Array.from(tagSet);
                tagList.forEach(tag => {
                    createPage({
                        path: `/tags/${_.kebabCase(tag)}/`,
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
            })
        );
    });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === "build-javascript") {
        config.plugin("Lodash", webpackLodashPlugin, null);
    }
};
