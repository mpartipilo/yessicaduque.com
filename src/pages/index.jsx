import React from "react";
import { graphql } from "gatsby";
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";

import SEO from "../components/SEO/SEO";
import Masthead from "../components/Masthead";
import About from "../components/About";
import GallerySummary from "../components/GallerySummary";
import InstagramFeed from "../components/InstagramFeed";
import Contact from "../components/Contact";
import BlogSummary from "../components/BlogSummary";
import Layout from "../components/Layout";

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
      <Layout {...this.props}>
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
          <InstagramFeed />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    gallery(entry: { title_slug: { eq: "featured-images" } }) {
      entry {
        title
        images {
          path
        }
      }
    }

    highlights: gallery(entry: { title_slug: { eq: "portfolio" } }) {
      entry {
        title
        images {
          path
          meta {
            title
            asset
          }
        }
      }
    }

    allBlog(limit: 5, sort: { fields: [properties____modified], order: DESC }) {
      edges {
        node {
          host
          properties {
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
            title_slug
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
