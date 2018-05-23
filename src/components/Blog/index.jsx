import React, { Component } from "react";
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
import PostTags from "../PostTags/PostTags";

import "./index.scss";

export const getPostList = postEdges => {
  const postList = [];
  postEdges.forEach(postEdge => {
    postList.push({
      host: postEdge.node.host,
      path: postEdge.node.fields.slug,
      tags: postEdge.node.entry.tags || [],
      cover: {
        path: postEdge.node.entry.image.path
      },
      title: postEdge.node.entry.title,
      date: postEdge.node.properties._modified * 1000,
      summary:
        postEdge.node.childCockpitBlogExcerptTextNode.childMarkdownRemark
          .html || "",
      excerpt:
        postEdge.node.childCockpitBlogContentTextNode.childMarkdownRemark.html,
      timeToRead:
        postEdge.node.childCockpitBlogContentTextNode.childMarkdownRemark
          .timeToRead
    });
  });
  return postList;
};

export const PostCardSummary = post => (
  <Col lg={4} md={6} key={post.title}>
    <Card style={{ marginBottom: 5 }}>
      <CardImg
        top
        width="100%"
        src={`${post.host}/storage/uploads${post.cover.path}`}
        alt={post.title}
      />
      <CardBody>
        <CardTitle>
          <Link to={post.path} href={post.path}>
            {post.title}
          </Link>
        </CardTitle>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.summary.length > 0 ? post.summary : post.excerpt
          }}
        />
        <div>
          <span className="badge badge-default">
            Posted <Moment format="YYYY-MM-DD">{post.date}</Moment>
          </span>
        </div>
      </CardBody>
    </Card>
  </Col>
);

class Blog extends Component {
  render() {
    return (
      <Container className="oddRow">
        <Row>{getPostList(this.props.postEdges).map(PostCardSummary)}</Row>
      </Container>
    );
  }
}

export default Blog;
