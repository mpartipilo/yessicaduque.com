import React, { Component } from "react";

import "./index.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="text-center">
        <span role="img" aria-label="copyright">
          ©
        </span>{" "}
        Yessica Duque - 2017<br />Design &amp; Development by{" "}
        <a
          href="https://www.linkedin.com/in/mpartipilo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michelangelo Partipilo
        </a>
        <br />All rights reserved
      </footer>
    );
  }
}

export default Footer;
