import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";

import "../../scss/index.scss";

import config from "../../../data/SiteConfig";

import Header from "../Header";
import Footer from "../Footer";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class MainLayout extends React.Component {
  getInvertHeader() {
    const { location, invert } = this.props;
    if (invert) {
      return invert;
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    return currentPath !== "";
  }

  getLocalTitle() {
    const { location } = this.props;

    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath === "gallery") {
      title = "Portfolio";
    } else if (currentPath === "blog") {
      title = "Blog";
    } else if (_.includes(currentPath, "posts")) {
      title = "Article";
    } else if (_.includes(currentPath, "tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (_.includes(currentPath, "categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }

  render() {
    const { children } = this.props;
    const invertFixedHeader = this.getInvertHeader();
    return (
      <>
        <Helmet>
          <title>{`${config.siteTitle} | ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
          <script src="https://apps.elfsight.com/p/platform.js" defer />
        </Helmet>
        <Header alwaysShow={invertFixedHeader} />
        {children}
        <Footer />
      </>
    );
  }
}

export default MainLayout;
