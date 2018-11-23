import React from "react";
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";

import SEO from "../components/SEO/SEO";
import Masthead from "../components/Masthead";
import About from "../components/About";
import GallerySummary from "../components/GallerySummary";
import InstagramFeed from "../components/InstagramFeed";
import Contact from "../components/Contact";
import BlogSummary from "../components/BlogSummary";

class Index extends React.Component {
  componentWillMount() {
    configureAnchors({ offset: -100, keepLastAnchorHash: true });
  }

  render() {
    const postEdges = this.props.data.allCockpitBlog.edges;
    const featuredGallery = this.props.data.cockpitGallery.entry.images.map(
      i => `${this.props.data.cockpitGallery.host}${i.path}`
    );
    const highlights = this.props.data.highlights.entry.images.map(i => ({
      thumb2: i.thumb2,
      thumb3: i.thumb3,
      photo: {
        src: `${this.props.data.highlights.host}${i.path}`,
        width: i.meta.asset.width,
        height: i.meta.asset.height
      }
    }));
    return (
      <div className="index-container">
        <SEO postEdges={postEdges} />
        <Masthead bgImages={featuredGallery} />
        <section id="_about">
          <ScrollableAnchor id="about">
            <About />
          </ScrollableAnchor>
        </section>
        <section id="_blog">
          <ScrollableAnchor id="blog">
            <BlogSummary postEdges={postEdges} />
          </ScrollableAnchor>
        </section>
        <section id="_portfolioSummary">
          <ScrollableAnchor id="portfolio">
            <div>
              <GallerySummary images={highlights} />
              <div style={{ height: `30px` }} />
              {/* <InstagramFeed /> */}
            </div>
          </ScrollableAnchor>
        </section>
        <section id="_contact">
          <ScrollableAnchor id="contact">
            <Contact />
          </ScrollableAnchor>
        </section>
        -<InstagramFeed />-
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    cockpitGallery(properties: { title_slug: { eq: "featured-images" } }) {
      host
      entry {
        title
        images {
          path
        }
      }
    }
    highlights: cockpitGallery(
      properties: { title_slug: { eq: "portfolio" } }
    ) {
      host
      entry {
        title
        images {
          thumb2 {
            src
            width
            height
          }
          thumb3 {
            src
            width
            height
          }
          path
          meta {
            asset {
              width
              height
            }
          }
        }
      }
    }

    allCockpitBlog(
      limit: 5
      sort: { fields: [properties____created], order: DESC }
    ) {
      edges {
        node {
          host
          properties {
            title_slug
            _created
            _modified
          }
          childCockpitBlogExcerptTextNode {
            childMarkdownRemark {
              html
            }
          }
          childCockpitBlogContentTextNode {
            childMarkdownRemark {
              timeToRead
              html
            }
          }
          entry {
            title
            image {
              path
            }
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
