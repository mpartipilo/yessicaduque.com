import React from "react";
import Helmet from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

import "../scss/post.scss";

export default class TagTemplate extends React.Component {
  render() {
    const tag = this.props.pathContext.tag;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
        <Container>
          <Row>
            <Col>
              <p>Posts tagged as <strong>{tag}</strong></p>
            </Col>
          </Row>
          <Row>
            <Col>
              <PostListing postEdges={postEdges} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
