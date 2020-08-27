import React from "react";
import Moment from "react-moment";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import { graphql, Link } from "gatsby";

export const getPostList = (postEdges) =>
  postEdges.map(({ node }) => ({
    path: node.fields.slug,
    tags: node.entry.tags || [],
    cover: node.entry.image.localFile.childImageSharp,
    title: node.entry.title,
    date: node.properties._modified * 1000,
    summary: node.entry.excerpt.markdown.childMarkdownRemark.html,
    excerpt: node.entry.content.markdown.childMarkdownRemark.html,
    timeToRead: node.entry.content.markdown.childMarkdownRemark.timeToRead,
  }));

export const PostCardSummary = (post) => {
  const { title, cover, path, summary, excerpt, date } = post;
  return (
    <Col lg={4} md={6} key={title}>
      <Card style={{ marginBottom: 5 }}>
        <Link to={path} href={path}>
          <CardImg
            top
            width="100%"
            className="h-100"
            src={cover.fixed.src}
            alt={title}
          />
        </Link>
        <CardBody>
          <CardTitle>
            <Link to={path} href={path}>
              {title}
            </Link>
          </CardTitle>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: summary.length > 0 ? summary : excerpt,
            }}
          />
          <div>
            <span className="badge badge-default">
              Posted <Moment format="YYYY-MM-DD">{date}</Moment>
            </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const Blog = ({ posts }) => (
  <Container>
    <Row>{posts.map(PostCardSummary)}</Row>
  </Container>
);

export default Blog;

export const query = graphql`
  fragment RecipePostSummary on Blog {
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
