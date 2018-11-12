import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
import { ReactInterval } from "react-interval";
import Img from "gatsby-image";
import "./index.scss";

class Masthead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImages: props.bgImages || [],
      currentImg: 0
    };
  }

  render() {
    const { bgImages, currentImg } = this.state;
    return (
      <Jumbotron fluid>
        <ReactInterval
          timeout={6000}
          enabled
          callback={() =>
            this.setState({
              currentImg: (currentImg + 1) % bgImages.length
            })
          }
        />
        {bgImages.map((i, idx) => (
          <div key={bgImages[idx].id}>
            <Img
              fluid={bgImages[idx].fluid}
              className={idx === currentImg ? "opaque" : ""}
            />
          </div>
        ))}
      </Jumbotron>
    );
  }
}

export default Masthead;
