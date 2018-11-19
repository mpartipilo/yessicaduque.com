import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import Blog, { getPostList } from "../components/Blog";
import config from "../../data/SiteConfig";

import "../scss/post.scss";

export default class TagTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { tag } = pageContext;
    const postEdges = getPostList(data.allCockpitBlog.edges);
    return (
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
        <section id="_blog">
          <Container>
            <Row>
              <Col>
                <p>
                  Posts tagged as <strong>{tag}</strong>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Blog posts={postEdges} />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allBlog(
      limit: 100
      sort: { fields: [properties____modified], order: DESC }
      filter: { entry: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          properties {
            _modified
          }
          entry {
            title_slug
            title
            image {
              path
            }
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
                  html
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
