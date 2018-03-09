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
    NavLink
} from "reactstrap";

import "./index.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            scrollThresholdCrossed: false,
            dimensions: {
                width: -1,
                height: -1
            }
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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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

    render() {
        const { width, height } = this.state.dimensions;
        const alwaysShow = this.props.alwaysShow || false;
        const inverted =
            this.state.isOpen ||
            this.state.scrollThresholdCrossed ||
            alwaysShow;
        const classes = classNames({
            "navbar-shrink": inverted
        });

        return (
            <div>
                <Measure
                    bounds
                    onResize={contentRect => {
                        this.setState({
                            dimensions: contentRect.bounds
                        });
                    }}
                >
                    {({ measureRef }) => (
                        <header
                            id="page-top"
                            style={{
                                height:
                                    width <= 946 || alwaysShow ? height + 16 : 0
                            }}
                        >
                            <Navbar
                                expand="md"
                                fixed="top"
                                light
                                className={classes}
                                id="mainNav"
                            >
                                <div className="container" ref={measureRef}>
                                    <NavbarBrand href="/#page-top">
                                        {width > 946 ? (
                                            <img
                                                src={
                                                    inverted
                                                        ? "/img/logo_inv.png"
                                                        : "/img/logo.png"
                                                }
                                                alt="Yessica Duque - Food stylist & photography"
                                            />
                                        ) : (
                                            <img
                                                src="/img/logo_inv.png"
                                                alt="Yessica Duque - Food stylist & photography"
                                            />
                                        )}
                                    </NavbarBrand>
                                    <NavbarToggler onClick={this.toggle} />
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav className="ml-auto" navbar>
                                            <NavItem>
                                                <NavLink href="/#about">
                                                    About
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/#services">
                                                    Services
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/#portfolio">
                                                    Portfolio
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/#blog">
                                                    Blog
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/#contact">
                                                    Contact
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Collapse>
                                </div>
                            </Navbar>
                        </header>
                    )}
                </Measure>
                {this.props.children}
            </div>
        );
    }
}

export default Header;
