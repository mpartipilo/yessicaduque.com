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
import RecipesSummary from "../components/RecipesSummary";
import Layout from "../components/Layout";

class Index extends React.Component {
  componentWillMount() {
    configureAnchors({ offset: -100, keepLastAnchorHash: true });
  }

  render() {
    const { data } = this.props;
    const { allBlog, allPost, gallery } = data;
    const { edges: recipePostEdges } = allBlog;
    const { edges: blogPostsEdges } = allPost;

    const featuredGallery = gallery.entry.images.map(
      i => i.localFile.childImageSharp
    );
    const highlights = data.highlights.entry.images.map(
      i => i.localFile.childImageSharp
    );
    return (
      <Layout {...this.props}>
        <div className="index-container">
          <SEO />
          <Masthead bgImages={featuredGallery} />
          <section id="_blog">
            <ScrollableAnchor id="blog">
              <BlogSummary postEdges={blogPostsEdges} />
            </ScrollableAnchor>
          </section>
          <section id="_recipes">
            <ScrollableAnchor id="recipes">
              <RecipesSummary postEdges={recipePostEdges} />
            </ScrollableAnchor>
          </section>
          <section id="_portfolioSummary">
            <ScrollableAnchor id="portfolio">
              <div>
                <GallerySummary images={highlights} />
                <div style={{ height: `30px` }} />
              </div>
            </ScrollableAnchor>
          </section>
          <section id="_about">
            <ScrollableAnchor id="about">
              <About />
            </ScrollableAnchor>
          </section>
          <section id="_contact">
            <ScrollableAnchor id="contact">
              <Contact />
            </ScrollableAnchor>
          </section>
          {/* <InstagramFeed /> */}
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
          localFile {
            childImageSharp {
              id
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    highlights: gallery(entry: { title_slug: { eq: "portfolio" } }) {
      entry {
        title
        images {
          localFile {
            childImageSharp {
              id
              thumb: fixed(width: 475) {
                ...GatsbyImageSharpFixed
              }
              picture: fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    allBlog(limit: 3, sort: { fields: [properties____modified], order: DESC }) {
      edges {
        node {
          ...RecipePostSummary
        }
      }
    }

    allPost(limit: 3, sort: { fields: [properties____modified], order: DESC }) {
      edges {
        node {
          ...BlogPostSummary
        }
      }
    }
  }
`;
