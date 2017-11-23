import React from "react";
import Gallery from "../components/Gallery";

import "../scss/gallery.scss";

class Index extends React.Component {
    render() {
        const gallery = this.props.data.cockpitGallery.entry.images.map(i => ({
            src: `${this.props.data.cockpitGallery.host}${i.path}`,
            width: i.meta.asset.width,
            height: i.meta.asset.height
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
