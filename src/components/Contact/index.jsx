import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import FA from "react-fontawesome";

class Contact extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col
            widths={["lg"]}
            lg={{ offset: 2, size: 8 }}
            className="text-center"
          >
            <h2 className="section-heading">Let&apos;s Get In Touch!</h2>
            <hr className="primary" />
            <p>
              {`
              I'm ready to start your next project! Are you? Give me a call or
              send me an email and I will get back to you as soon as possible!
              `}
            </p>
          </Col>
        </Row>
        <Row>
          <div className="col-lg-4 offset-lg-2 text-center">
            <FA name="phone" size="3x" className="p-3" />
            <p>
              <a href="tel:+31625247696">+31 (0)6 2524 7696</a>
            </p>
          </div>
          <div className="col-lg-4 text-center">
            <FA name="envelope-o" size="3x" className="p-3" />
            <p>
              <a href="mailto:info@yessicaduque.com">info@yessicaduque.com</a>
            </p>
          </div>
        </Row>
        <Row>
          <Col className="text-center">
            <h2 className="section-heading">Follow me</h2>
            <hr className="primary" />
            <a
              href="https://www.facebook.com/yessicaduquephotographer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FA name="facebook" size="2x" className="p-3" />
            </a>
            <a
              href="https://www.instagram.com/yessica_duque_photography/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FA name="instagram" size="2x" className="p-3" />
            </a>
            <a
              href="https://twitter.com/YekaMagenta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FA name="twitter" size="2x" className="p-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/yessicaduque/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FA name="linkedin" size="2x" className="p-3" />
            </a>

            <a
              href="https://www.youtube.com/user/yessicaduque/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FA name="youtube-play" size="2x" className="p-3" />
            </a>

            <a
              href="https://nl.pinterest.com/yessicaduquephotography/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FA name="pinterest" size="2x" className="p-3" />
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;
