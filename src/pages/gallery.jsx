import React from "react";
import { graphql } from "gatsby";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";

class Index extends React.Component {
  render() {
    const { data } = this.props;
    const gallery = data.gallery.entry.images.map(i => ({
      thumb2: i.thumb2,
      thumb3: i.thumb3,
      photo: {
        src: `${data.gallery.host}${i.path}`,
        width: i.meta.asset.width,
        height: i.meta.asset.height
      }
    }));

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
        images {
          path
          meta {
            title
            asset
          }
        }
        published
        title
        tags
        title_slug
      }
    }
  }
`;
