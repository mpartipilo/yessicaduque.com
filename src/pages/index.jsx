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
    const { edges: blogPostsEdges } = allPost || { edges: [] };

    const featuredGallery = gallery.entry.images.map(
      i => i.localFile.childImageSharp
    );
    const highlights = data.highlights.entry.images.map(
      i => i.localFile.childImageSharp
    );
    const seoImage = featuredGallery[0].fluid.src;
    return (
      <Layout {...this.props} invert>
        <div className="index-container">
          <SEO image={seoImage} />
          <Masthead bgImages={featuredGallery} />
          {(blogPostsEdges || []).length > 0 && (
            <section id="_blog">
              <ScrollableAnchor id="blog">
                <BlogSummary postEdges={blogPostsEdges} />
              </ScrollableAnchor>
            </section>
          )}
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
          localFile {
            childImageSharp {
              id
              fluid(maxWidth: 1600) {
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

    allBlog(
      limit: 3
      filter: { entry: { published: { eq: true } } }
      sort: { fields: [properties____created], order: DESC }
    ) {
      edges {
        node {
          ...RecipePostSummary
        }
      }
    }

    allPost(
      limit: 3
      filter: { entry: { published: { eq: true } } }
      sort: { fields: [properties____modified], order: DESC }
    ) {
      edges {
        node {
          ...BlogPostSummary
        }
      }
    }
  }
`;
