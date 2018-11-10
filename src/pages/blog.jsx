import React from "react";
import { graphql } from "gatsby";
import Blog, { getPostList } from "../components/Blog";
import Layout from "../components/Layout";

import "../scss/blog.scss";

const BlogPage = ({ data, location }) => (
  <Layout {...{ location }}>
    <div className="index-container" id="_blog">
      <Blog posts={getPostList(data.allBlog.edges)} />
    </div>
  </Layout>
);

export default BlogPage;

export const pageQuery = graphql`
  query BlogQuery {
    allBlog(
      limit: 100
      sort: { fields: [properties____modified], order: DESC }
    ) {
      edges {
        node {
          properties {
            _modified
          }
          childExcerptTextNode {
            childMarkdownRemark {
              html
            }
          }
          childContentTextNode {
            childMarkdownRemark {
              timeToRead
              html
            }
          }
          entry {
            title
            title_slug
            tags
            image {
              path
              title
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
