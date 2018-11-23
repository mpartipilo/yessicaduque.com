/* global graphql */

import React from "react";
import Blog, { getPostList } from "../components/Blog";

import "../scss/blog.scss";

const BlogPage = props => (
  <div className="index-container" id="_blog">
    <Blog posts={getPostList(props.data.allCockpitBlog.edges)} />
  </div>
);

export default BlogPage;

export const pageQuery = graphql`
  query BlogQuery {
    allCockpitBlog(
      limit: 100
      sort: { fields: [properties____created], order: DESC }
    ) {
      edges {
        node {
          host
          properties {
            title_slug
            _created
            _modified
          }
          childCockpitBlogExcerptTextNode {
            childMarkdownRemark {
              html
            }
          }
          childCockpitBlogContentTextNode {
            childMarkdownRemark {
              timeToRead
              html
            }
          }
          entry {
            title
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
