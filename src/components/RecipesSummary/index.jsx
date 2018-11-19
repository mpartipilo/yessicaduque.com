import React, { Component, Fragment } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "gatsby";
import Recipes, { getPostList } from "../Recipes";
import "./index.scss";

class RecipesSummary extends Component {
  render() {
    const { postEdges } = this.props;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-heading">Latest recipes</h2>
              <hr className="primary" />
              <p>Sharing is caring, and I care a lot!</p>
            </Col>
          </Row>
        </Container>
        <Recipes posts={getPostList(postEdges)} />
        <Container>
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                color="primary"
                size="xl"
                href="/recipes"
                to="recipes"
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

export default RecipesSummary;
