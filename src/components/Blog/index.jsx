import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "gatsby-link";
import PostTags from "../PostTags/PostTags";

import "./index.scss";

export const GetPostList = postEdges => {
  const postList = [];
  postEdges.forEach(postEdge => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags || [],
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.frontmatter.date,
      summary: postEdge.node.frontmatter.summary || "",
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead
    });
  });
  return postList;
}

export const PostSummary = post => (
  <Row key={post.title}>
    <Col>
      <article>
        <Link to={post.path}><h1>{post.title}</h1></Link>
        <p>{post.summary.length > 0 ? post.summary : post.excerpt}</p>
        <div>
          <span className="badge badge-default">
            Posted {post.date}
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
      <Container className="oddRow">{GetPostList(this.props.postEdges).map(PostSummary)}</Container>
    );
  }
}

export default Blog;
