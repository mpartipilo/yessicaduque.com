import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

import Services from "../Services";

import "./index.scss";

class About extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 4 }}>
              <img
                src="/img/profile.jpg"
                alt="Yessica Duque"
                width="100%"
                height="100%"
                style={{ objectFit: "cover", maxHeight: "80vh" }}
              />
            </Col>
            <Col lg={{ size: 6 }} md={{ size: 8 }}>
              <div className="text-center" style={{ paddingTop: "1em" }}>
                <h2 className="section-heading">Something about me</h2>
                <hr className="primary" />
              </div>
              <div className="text-justify">
                <p>
                  I am a kitchen adventurer who loves photography as much as I
                  enjoy food flavors and colors. I appreciate every experience
                  and every project. Every detail is an opportunity for me to
                  shine and show the best of myself through a photograph.
                </p>

                <p>
                  I am based in the Netherlands, in the city of The Hague. My
                  work involves beautiful food imagery for outdoor campaigns,
                  social media, and PR for restaurants and Chefs in Europe. This
                  is complemented by many years of experience as Graphic and
                  Visual Designer.
                </p>

                <p>
                  My expertise in Food Photography and Food Styling is backed by{" "}
                  <a
                    href="https://www.cordonbleu.edu/london/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Le Cordon Bleu Paris
                  </a>
                  ,{" "}
                  <a
                    href="https://www.leiths.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leiths School of Food and Wine in London
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.internationalculinarycenter.com/new-york-campus/amateur-classes-ny/food-styling-media/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Food Styling for Media The International Culinary Center ICC
                    New York
                  </a>
                  .
                </p>

                <div>
                  <p>Some additional ceritifications:</p>
                  <ul>
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Hazard_analysis_and_critical_control_points">
                        HACCP
                      </a>{" "}
                      <a href="https://www.horecaacademie.nl/">
                        Horeca Academie Den Haag
                      </a>
                    </li>
                    <li>
                      <a href="https://online.stanford.edu/courses/som-y0002-child-nutrition-and-cooking">
                        Child nutrition and Cooking - Stanford University
                      </a>
                    </li>
                    <li>
                      Barista Training by Giancarlo Matarazzi:{" "}
                      <a href="https://capriolecafe.nl/koffie-barista-workshops-den-haag/">
                        Capriol&eacute; Caf&eacute;
                      </a>
                    </li>
                  </ul>
                </div>

                <p>
                  Check out social media feeds to learn more about my career and
                  current work.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Services />
        </Container>
      </Fragment>
    );
  }
}

export default About;
