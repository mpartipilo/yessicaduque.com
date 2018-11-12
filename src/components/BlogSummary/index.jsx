import React, { Component, Fragment } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "gatsby";
import Blog, { getPostList } from "../Blog";
import "./index.scss";

class BlogSummary extends Component {
  render() {
    const { postEdges } = this.props;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-heading">My recipes</h2>
              <hr className="primary" />
              <p>Sharing is caring, and I care a lot!</p>
            </Col>
          </Row>
        </Container>
        <Blog posts={getPostList(postEdges.slice(0, 3))} />
        <Container>
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
      </Fragment>
    );
  }
}

export default BlogSummary;
