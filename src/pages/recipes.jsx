import React from "react";
import { graphql } from "gatsby";
import Blog, { getPostList } from "../components/Blog";
import Layout from "../components/Layout";

const BlogPage = ({ data, location }) => (
  <Layout {...{ location }}>
    <div className="index-container" id="_blog">
      <Blog posts={getPostList(data.allBlog.edges)} />
    </div>
  </Layout>
);

export default BlogPage;

export const pageQuery = graphql`
  query {
    allBlog(
      limit: 100
      filter: { entry: { published: { eq: true } } }
      sort: { fields: [properties____modified], order: DESC }
    ) {
      edges {
        node {
          properties {
            _modified
          }
          entry {
            title
            title_slug
            tags
            excerpt {
              markdown {
                childMarkdownRemark {
                  html
                }
              }
            }
            content {
              markdown {
                childMarkdownRemark {
                  timeToRead
                }
              }
            }
            image {
              localFile {
                id
                childImageSharp {
                  id
                  fixed(width: 510, height: 400) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
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
