import React from "react";
import FA from "react-fontawesome";

const style = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%"
};

const UserLink = ({ label, url, iconClassName }) => (
  <a
    key={label}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
  >
    <FA name={iconClassName} size="2x" className="p-3" />
  </a>
);

const UserLinks = ({ config: userLinks }) =>
  userLinks && <div style={style}>{userLinks.map(UserLink)}</div>;

export default UserLinks;
