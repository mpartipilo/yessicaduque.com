import React, { Component } from "react";
import FA from "react-fontawesome";
import "./UserLinks.css";

class UserLinks extends Component {
    getLinkElements() {
        const { userLinks } = this.props.config;
        const { labeled } = this.props.labeled;
        return userLinks.map(link => (
            <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
            >
                <FA name={link.iconClassName} size="2x" className="p-3" />
            </a>
        ));
    }
    render() {
        const { userLinks } = this.props.config;
        if (!userLinks) {
            return null;
        }
        return <div className="user-links">{this.getLinkElements()}</div>;
    }
}

export default UserLinks;
