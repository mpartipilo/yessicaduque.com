import React from "react";
import ScrollableAnchor, { configureAnchors }  from "react-scrollable-anchor";

import SEO from "../components/SEO/SEO";
import Masthead from "../components/Masthead";
import About from "../components/About";
import Services from "../components/Services";
import GallerySummary from "../components/GallerySummary";
import InstagramFeed from "../components/InstagramFeed";
import Contact from "../components/Contact";
import BlogSummary from "../components/BlogSummary";

class Index extends React.Component {
  componentWillMount() {
    configureAnchors({offset: -100, keepLastAnchorHash: true });
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="index-container">
        <SEO postEdges={postEdges} />
        <Masthead />
        <section id="_about">
          <ScrollableAnchor id={"about"}>
            <About />
          </ScrollableAnchor>
        </section>
        <section id="_services">
          <ScrollableAnchor id={"services"}>
            <Services />
          </ScrollableAnchor>
        </section>
        <section id="_portfolioSummary">
          <ScrollableAnchor id={"portfolio"}>
            <div>
              <GallerySummary />
              <div style={{height: `30px`}} />
              <InstagramFeed />
            </div>
          </ScrollableAnchor>
        </section>
        <section id="_blog">
          <ScrollableAnchor id={"blog"}>
            <BlogSummary postEdges={postEdges} />
          </ScrollableAnchor>
        </section>
        <section id="_contact">
          <ScrollableAnchor id={"contact"}>
            <Contact />
          </ScrollableAnchor>
        </section>
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            summary
          }
        }
      }
    }
  }
`;
