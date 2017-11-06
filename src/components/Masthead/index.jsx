import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
import { ReactInterval } from "react-interval";

import "./index.scss";

class Masthead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetTop: 0,
      bgImages: [
        '00027 Scalop1.jpg',
        '00051 N35C0898.jpg',
        '00059 Octopus-1.jpg'
      ],
      currentImg: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize(null);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    const header = document.getElementById("mainNav");
    const headerHeight = header.clientHeight;
    this.setState({ offsetTop: headerHeight });
  }

  render() {
    return (
      <Jumbotron fluid>
        <ReactInterval
          timeout={6000}
          enabled
          callback={() => this.setState({ currentImg: (this.state.currentImg + 1) % this.state.bgImages.length })} 
        />
        {this.state.bgImages.map((i,idx) => (
          <div 
            key={this.state.bgImages[idx]}
            style={{ backgroundImage: `url('/img/gallery/p/${ this.state.bgImages[idx] }')` }} 
            className={(idx === this.state.currentImg) ? "opaque" : ''}
          />
        ))}
      </Jumbotron>
    );
  }
}

export default Masthead;
