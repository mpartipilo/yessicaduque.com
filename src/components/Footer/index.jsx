import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="text-center">
        Yessica Duque - KvK 72845996<br />Design &amp; Development by{" "}
        <a
          href="https://www.linkedin.com/in/mpartipilo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michelangelo Partipilo
        </a>
        <br />
        <span role="img" aria-label="copyright">
          © 2017 - All rights reserved
        </span>
      </footer>
    );
  }
}

export default Footer;
