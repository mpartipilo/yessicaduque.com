import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import FA from "react-fontawesome";
import "./index.scss";

class Services extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col lg="12" className="text-center">
                        <h2 className="section-heading">What I do</h2>
                        <hr className="primary" />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm="12" md="6" lg="4" widths={["sm", "md", "lg"]}>
                        <div className="service-box text-center">
                            <FA
                                name="cutlery"
                                className="text-primary"
                                size="4x"
                            />
                            <h3>Food styling</h3>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="4" widths={["sm", "md", "lg"]}>
                        <div className="service-box text-center">
                            <FA
                                name="camera-retro"
                                className="text-primary"
                                size="4x"
                            />
                            <h3>Photography</h3>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="4" widths={["sm", "md", "lg"]}>
                        <div className="service-box text-center">
                            <FA
                                name="pencil-square-o"
                                className="text-primary"
                                size="4x"
                            />
                            <h3>Blogging</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Services;
