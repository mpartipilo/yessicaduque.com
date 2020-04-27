import React, { Component } from "react";
import Measure from "react-measure";
import classNames from "classnames";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

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
                expand="md"
                fixed="top"
                light
                className={classes}
                id="mainNav"
              >
                <div className="container" ref={measureRef}>
                  <NavbarBrand href="/#page-top">
                    <img
                      src={
                        width > 946 ? "/img/logo_inv.png" : "/img/logo_inv.png"
                      }
                      alt="Yessica Duque - Food stylist &amp; photography"
                    />
                  </NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      {/* <NavItem>
                        <NavLink href="/#blog">Blog</NavLink>
                      </NavItem> */}
                      <NavItem>
                        <NavLink href="/#recipes">Recipes</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/#portfolio">Gallery</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/#about">About</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/#contact">Contact</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
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
