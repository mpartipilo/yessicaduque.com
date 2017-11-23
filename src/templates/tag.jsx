import React from "react";
import Helmet from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import Blog from "../components/Blog";
import config from "../../data/SiteConfig";

import "../scss/post.scss";

export default class TagTemplate extends React.Component {
    render() {
        const { tag } = this.props.pathContext;
        const postEdges = this.props.data.allCockpitBlog.edges;
        return (
            <div className="tag-container">
                <Helmet
                    title={`Posts tagged as "${tag}" | ${config.siteTitle}`}
                />
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
                                <Blog postEdges={postEdges} />
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
        allCockpitBlog(
            limit: 100
            sort: { fields: [properties____modified], order: DESC }
            filter: { entry: { tags: { in: [$tag] } } }
        ) {
            totalCount
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
