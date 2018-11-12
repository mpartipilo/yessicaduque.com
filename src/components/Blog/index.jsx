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
  CardText
} from "reactstrap";
import { Link } from "gatsby";
import Img from "gatsby-image";

import "./index.scss";

export const getPostList = postEdges =>
  postEdges.map(({ node }) => ({
    host: node.host,
    path: node.fields.slug,
    tags: node.entry.tags || [],
    cover: node.entry.image.localFile.childImageSharp,
    title: node.entry.title,
    date: node.properties._modified * 1000,
    summary: node.childExcerptTextNode.childMarkdownRemark.html,
    excerpt: node.childContentTextNode.childMarkdownRemark.html,
    timeToRead: node.childContentTextNode.childMarkdownRemark.timeToRead
  }));

export const PostCardSummary = post => {
  const { title, cover, path, summary, excerpt, date } = post;
  return (
    <Col lg={4} md={6} key={title}>
      <Card style={{ marginBottom: 5 }}>
        <CardImg
          top
          width="100%"
          className="h-100"
          src={cover.fixed.src}
          alt={title}
        />
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
              Posted
              <Moment format="YYYY-MM-DD">{date}</Moment>
            </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const Blog = ({ posts }) => (
  <Container className="oddRow">
    <Row>{posts.map(PostCardSummary)}</Row>
  </Container>
);

export default Blog;
