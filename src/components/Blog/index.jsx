import React, { Component } from "react";
import Moment from "react-moment";
import { Container, Row, Col } from "reactstrap";
import Link from "gatsby-link";
import PostTags from "../PostTags/PostTags";

import "./index.scss";

export const GetPostList = postEdges => {
  const postList = [];
  postEdges.forEach(postEdge => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.entry.tags || [],
      cover: postEdge.node.entry.image,
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

export const PostSummary = post => (
  <Row key={post.title}>
    <Col>
      <article>
        <Link to={post.path} href={post.path}>
          <h1>{post.title}</h1>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: post.summary.length > 0 ? post.summary : post.excerpt
          }}
        />
        <div>
          <span className="badge badge-default">
            Posted <Moment format="YYYY-MM-DD">{post.date}</Moment>
          </span>
          <div className="pull-right">
            <PostTags tags={post.tags} />
          </div>
        </div>
      </article>
      <hr />
    </Col>
  </Row>
);

class Blog extends Component {
  render() {
    return (
      <Container className="oddRow">
        {GetPostList(this.props.postEdges).map(PostSummary)}
      </Container>
    );
  }
}

export default Blog;
