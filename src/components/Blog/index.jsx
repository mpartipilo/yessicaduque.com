import React from "react";
import Moment from "react-moment";
import { Container, Row, Col, CardBody, CardTitle } from "reactstrap";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

export const getPostList = postEdges =>
  postEdges.map(({ node }) => ({
    host: node.host,
    path: node.fields.slug,
    tags: node.entry.tags || [],
    cover: node.entry.image.localFile.childImageSharp,
    title: node.entry.title,
    date: node.properties._modified * 1000,
    summary: node.entry.excerpt.markdown.childMarkdownRemark.html,
    excerpt: node.entry.content.markdown.childMarkdownRemark.html,
    timeToRead: node.entry.content.markdown.childMarkdownRemark.timeToRead
  }));

export const PostCardSummary = post => {
  const { title, cover, path, summary, excerpt, date } = post;
  return (
    <div style={{ paddingBottom: "1em" }} key={title}>
      <div className="card">
        <Row key={title}>
          <Col lg={4} md={6}>
            <div
              style={{
                display: "inline-block",
                width: "100%",
                height: "100%",
                minHeight: 150,
                overflow: "hidden"
              }}
            >
              <Img
                fixed={cover.fixed}
                alt={title}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-block",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
          </Col>
          <Col lg={8} md={6}>
            <div
              style={{
                display: "table-cell",
                verticalAlign: "middle",
                padding: "6px"
              }}
            >
              <CardBody>
                <CardTitle>
                  <Link to={path} href={path}>
                    {title}
                  </Link>
                </CardTitle>
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: summary.length > 0 ? summary : excerpt
                  }}
                />
                <div>
                  <span className="badge badge-default">
                    Posted <Moment format="YYYY-MM-DD">{date}</Moment>
                  </span>
                </div>
              </CardBody>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const Blog = ({ posts }) => <Container>{posts.map(PostCardSummary)}</Container>;

export default Blog;

export const query = graphql`
  fragment BlogPostSummary on Post {
    properties {
      _modified
    }
    entry {
      title
      title_slug
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
            fixed(width: 527, height: 400) {
              ...GatsbyImageSharpFixed
            }
            fluid(maxWidth: 530, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      tags
    }
    fields {
      slug
    }
  }
`;
