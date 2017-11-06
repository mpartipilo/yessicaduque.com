import React from "react";
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import Link from "gatsby-link";
import Gallery from "../Gallery";

import "./index.scss";

class GallerySummary extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section-heading">Portfolio Highlights</h2>
            <hr className="primary" />
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="text-center">
            <Gallery limit="6" />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <Button color="primary" size="xl" href="/gallery" to="gallery" className="sr-button" tag={Link}>See more</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GallerySummary;
