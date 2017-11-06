import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import Link from "gatsby-link";
import {GetPostList, PostSummary} from "../Blog";
import "./index.scss";

class BlogSummary extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section-heading">Latest posts</h2>
            <hr className="primary" />
            <p>I also write about stuff that I feel like sharing</p>
          </Col>
        </Row>
        {GetPostList(this.props.postEdges).slice(0,3).map(PostSummary)}
        <Row className="mt-4">
          <Col className="text-center">
            <Button
              color="primary"
              size="xl"
              href="/blog"
              to="blog"
              className="sr-button"
              tag={Link}
            >
              See more
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BlogSummary;
