import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./index.scss";

class About extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ offset: 2, size: 8 }}>
            <div className="text-center">
              <div className="userWrapper">
                <div className="user">&nbsp;</div>
              </div>
              <h2 className="section-heading">Something about me</h2>
              <hr className="light" />
            </div>
            <p>
              I am a kitchen adventurer who loves photography as much as I
              enjoy food flavors and colors. I appreciate every experience and
              every project. Every detail is an opportunity for me to shine
              and show the best of myself through a photograph.
            </p>

            <p>
              I am based in the Netherlands, in the city of The Hague. My work
              involves beautiful food imagery for outdoor campaigns, social
              media, and PR for restaurants and Chefs in Europe. This is
              complimented by many years of experience as Graphic and Visual
              Designer.
            </p>

            <p>
              My expertise in Food Photography and Food Styling is backed by
              Le Cordon Bleu Paris and Leiths School of Food and Wine in London.
            </p>

            <p>
              Check out social media feeds to learn more about my career and
              current work.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default About;
