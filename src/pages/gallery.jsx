import React from "react";
import { graphql } from "gatsby";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";

import "../scss/gallery.scss";

class Index extends React.Component {
  render() {
    const { data } = this.props;
    const gallery = data.gallery.entry.images.map(
      i => i.localFile.childImageSharp
    );

    return (
      <Layout {...this.props}>
        <div className="index-container" id="_portfolio">
          <Gallery images={gallery} />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query GalleryQuery {
    gallery(entry: { title_slug: { eq: "portfolio" } }) {
      entry {
        published
        tags
        title
        title_slug
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
  }
`;
