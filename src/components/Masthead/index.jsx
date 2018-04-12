import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
import { ReactInterval } from "react-interval";

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
    return (
      <Jumbotron fluid>
        <ReactInterval
          timeout={6000}
          enabled
          callback={() =>
            this.setState({
              currentImg:
                (this.state.currentImg + 1) % this.state.bgImages.length
            })
          }
        />
        {this.state.bgImages.map((i, idx) => (
          <div
            key={this.state.bgImages[idx]}
            style={{
              backgroundImage: `url('${this.state.bgImages[idx]}')`
            }}
            className={idx === this.state.currentImg ? "opaque" : ""}
          />
        ))}
      </Jumbotron>
    );
  }
}

export default Masthead;
