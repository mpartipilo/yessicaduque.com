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
                    href="http://thebrandingplug.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    The Branding Plug
                </a>
                <br />All rights reserved
            </footer>
        );
    }
}

export default Footer;
