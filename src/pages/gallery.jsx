import React from "react";
import { graphql } from 'gatsby';
import Gallery from "../components/Gallery";

import "../scss/gallery.scss";

class Index extends React.Component {
  render() {
    const gallery = this.props.data.cockpitGallery.entry.images.map(i => ({
      thumb2: i.thumb2,
      thumb3: i.thumb3,
      photo: {
        src: `${this.props.data.cockpitGallery.host}${i.path}`,
        width: i.meta.asset.width,
        height: i.meta.asset.height
      }
    }));

    return (
      <div className="index-container" id="_portfolio">
        <Gallery images={gallery} />
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query GalleryQuery {
    cockpitGallery(properties: { title_slug: { eq: "portfolio" } }) {
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
  }
`;
