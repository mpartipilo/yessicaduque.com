import React from "react";
import { Container, Row, Col } from "reactstrap";

import Services from "../Services";

const About = () => (
  <>
    <Container>
      <Row>
        <Col lg={{ size: 6 }} md={{ size: 4 }}>
          <img
            src="http://content.yessicaduque.com/storage/uploads/2018/11/23/5bf867cb4d496Yessica-KEMA-14.jpg"
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
              I am a kitchen adventurer who loves photography as much as I enjoy
              food flavors and colors. I appreciate every experience and every
              project. Every detail is an opportunity for me to shine and show
              the best of myself through a photograph.
            </p>

            <p>
              I am based in the Netherlands, in a beautiful town called
              Wateringen. My work involves beautiful food imagery for outdoor
              campaigns, social media, and PR for restaurants and Chefs in
              Europe. This is complemented by many years of experience as
              Graphic and Visual Designer.
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
                Food Styling for Media The International Culinary Center ICC New
                York
              </a>
              .
            </p>
            <p>Featured in:</p>
            <ul>
              <li>
                <a
                  href="https://www.pinkladyfoodphotographeroftheyear.com/pink-lady-food-photographer-shortlist-2020/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Pink Lady Food Photography Award 2020 Shortlist
                </a>
              </li>
              <li>
                <a
                  href="https://www.ad.nl/koken-en-eten/deze-zeven-foodfotografen-uit-nederland-behoren-tot-de-besten-van-de-wereld~a9d8daab/?referrer=https://yessicaduque.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Algemeen Dagblad
                </a>
              </li>
              <li>
                <a
                  href="https://www.wos.nl/wateringse-genomineerd-voor-voedselfotografieprijs/nieuws/item?1157096"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Westlandse Omroep Stichting
                </a>
              </li>
              <li>
                <a
                  href="https://www.foodphotofestival.com/index.php/exhibitions-2019.html"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  FOODPHOTO FESTIVAL ART EXHIBITION - Velle Denmark 2019:
                  Festival Screening and Catalog
                </a>
              </li>
            </ul>
            <p>Awards and Certifications:</p>
            <ul>
              <li>
                <a
                  href="http://foodelia.cc/photographer/YessicaDuque"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Foodelia - International Food Photography Awards - Top 10 Food
                  Photographer of the Year 2019
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Hazard_analysis_and_critical_control_points"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  HACCP
                </a>
                <a
                  href="https://www.horecaacademie.nl/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Horeca Academie Den Haag
                </a>
              </li>
              <li>
                <a
                  href="https://online.stanford.edu/courses/som-y0002-child-nutrition-and-cooking"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Child nutrition and Cooking - Stanford University
                </a>
              </li>
              <li>
                Barista Training by Giancarlo Matarazzi:{" "}
                <a
                  href="https://capriolecafe.nl/koffie-barista-workshops-den-haag/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Capriol&eacute; Caf&eacute;
                </a>
              </li>
              <li>
                Fotografía Gastronómica y estilismo culinario:{" "}
                <a
                  href="http://kemafoodculture.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  KEMA Food Culture - Barcelona España
                </a>
              </li>
            </ul>
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
  </>
);

export default About;
