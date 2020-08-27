import React, { Component } from "react";
import Measure from "react-measure";
import classNames from "classnames";
import FA from "react-fontawesome";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Socials = () => (
  <>
    <a
      href="https://www.facebook.com/yessicaduquephotographer/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FA name="facebook" size="1x" className="p-2" />
    </a>
    <a
      href="https://www.instagram.com/yessica_duque_photography/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FA name="instagram" size="1x" className="p-2" />
    </a>
    <a
      href="https://twitter.com/YekaMagenta"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FA name="twitter" size="1x" className="p-2" />
    </a>
    <a
      href="https://www.linkedin.com/in/yessicaduque/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FA name="linkedin" size="1x" className="p-2" />
    </a>

    <a
      href="https://www.youtube.com/user/yessicaduque/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FA name="youtube-play" size="1x" className="p-2" />
    </a>

    <a
      href="https://nl.pinterest.com/yessicaduquephotography/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FA name="pinterest" size="1x" className="p-2" />
    </a>
  </>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      scrollThresholdCrossed: false,
      dimensions: {
        width: -1,
        height: -1,
      },
    };

    this.toggle = this.toggle.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const scrollThresholdCrossed = scrollTop > 100;
    this.setState({ scrollThresholdCrossed });
  }

  toggle() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const {
      state: {
        dimensions: { width, height },
        isOpen,
        scrollThresholdCrossed,
      },
      props: { alwaysShow = false },
    } = this;
    const inverted = isOpen || scrollThresholdCrossed || alwaysShow;
    const classes = classNames({
      "navbar-shrink": inverted,
    });

    return (
      <>
        <Measure
          bounds
          onResize={(contentRect) => {
            this.setState({
              dimensions: contentRect.bounds,
            });
          }}
        >
          {({ measureRef }) => (
            <header id="page-top" style={{ height }}>
              <Navbar
                expand="lg"
                fixed="top"
                light
                className={classes}
                id="mainNav"
              >
                <div
                  style={{ width: "100%" }}
                  className="d-flex justify-content-between"
                  ref={measureRef}
                >
                  <div>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        <NavItem>
                          <NavLink href="/#about">About</NavLink>
                        </NavItem>
                        {/* <NavItem>
                        <NavLink href="/#blog">Blog</NavLink>
                      </NavItem> */}
                        <NavItem>
                          <NavLink href="/#portfolio">Gallery</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="/#recipes">Recipes</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="/#contact">Contact</NavLink>
                        </NavItem>
                      </Nav>
                    </Collapse>
                  </div>
                  <div>
                    <NavbarBrand href="/#page-top">
                      <img
                        src={
                          width > 946
                            ? "/img/logo_inv.png"
                            : "/img/logo_inv.png"
                        }
                        alt="Yessica Duque - Food stylist &amp; photography"
                      />
                    </NavbarBrand>
                  </div>
                  <div>
                    <Socials />
                  </div>
                </div>
              </Navbar>
            </header>
          )}
        </Measure>
      </>
    );
  }
}

export default Header;
