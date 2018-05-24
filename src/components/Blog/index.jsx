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
import Link from "gatsby-link";

import "./index.scss";

export const getPostList = postEdges =>
  postEdges.map(({ node }) => ({
    host: node.host,
    path: node.fields.slug,
    tags: node.entry.tags || [],
    cover: node.entry.image.path,
    title: node.entry.title,
    date: node.properties._modified * 1000,
    summary: node.childCockpitBlogExcerptTextNode.childMarkdownRemark.html,
    excerpt: node.childCockpitBlogContentTextNode.childMarkdownRemark.html,
    timeToRead:
      node.childCockpitBlogContentTextNode.childMarkdownRemark.timeToRead
  }));

export const PostCardSummary = post => {
  const { title, cover, path, host, summary, excerpt, date } = post;
  return (
    <Col lg={4} md={6} key={title}>
      <Card style={{ marginBottom: 5 }}>
        <CardImg
          top
          width="100%"
          src={`${host}/storage/uploads${cover}`}
          alt={title}
        />
        <CardBody>
          <CardTitle>
            <Link to={path} href={path}>
              {title}
            </Link>
          </CardTitle>
          <CardText>
            <span
              dangerouslySetInnerHTML={{
                __html: summary.length > 0 ? summary : excerpt
              }}
            />
          </CardText>
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

const Blog = props => (
  <Container className="oddRow">
    <Row>{props.posts.map(PostCardSummary)}</Row>
  </Container>
);

export default Blog;
