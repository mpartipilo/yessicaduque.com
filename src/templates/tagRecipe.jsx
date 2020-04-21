import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import Blog, { getPostList } from "../components/Blog";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { location, invert, data, pageContext } = this.props;
    const { tag } = pageContext;
    const postEdges = getPostList(data.allBlog.edges);
    return (
      <Layout location={location} invert={invert}>
        <div className="tag-container">
          <Helmet title={`Recipes tagged as "${tag}" | ${config.siteTitle}`} />
          <section id="_blog">
            <Container>
              <Row>
                <Col>
                  <p>
                    Recipes tagged as <strong>{tag}</strong>
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
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagRecipePage($tag: String) {
    allBlog(
      limit: 100
      sort: { fields: [properties____modified], order: DESC }
      filter: { entry: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          ...RecipePostSummary
        }
      }
    }
  }
`;
