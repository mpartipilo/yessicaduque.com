import React from "react";
import Blog from "../components/Blog";

import "../scss/blog.scss";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allCockpitBlog.edges;
    return (
      <div className="index-container" id="_blog">
        <Blog postEdges={postEdges} />
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogQuery {
    allCockpitBlog(
      limit: 100
      sort: { fields: [properties____modified], order: DESC }
    ) {
      edges {
        node {
          host
          properties {
            title_slug
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
            image {
              path
            }
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
