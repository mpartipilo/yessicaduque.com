import React from "react";
import GalleryBase from "../GalleryBase";

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            thumbs: [],
            limit: props.limit || 0
        };
    }

    componentDidMount() {
        const scopedThis = this;

        fetch("/data/gallery.json", { method: "get" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return [];
            })
            .then(photoFiles => {
                let filteredThumbs = photoFiles;
                if (scopedThis.state.limit) {
                    filteredThumbs = filteredThumbs.slice(
                        0,
                        scopedThis.state.limit
                    );
                }
                const localThumbs = filteredThumbs.map(p => ({
                    src: `/img/gallery/t/${encodeURI(p.src)}`,
                    width: p.width,
                    height: p.height
                }));

                const localPhotos = photoFiles.map(p => ({
                    src: `/img/gallery/p/${p.src}`,
                    srcset: [
                        `/img/gallery/t/${encodeURI(p.src)} 480w`,
                        `/img/gallery/p/${encodeURI(p.src)} 800w`
                    ],
                    sizes: [
                        "(min-width: 480px) 50vw",
                        "(min-width: 1024px) 33.3vw",
                        "100vw"
                    ],
                    width: p.width,
                    height: p.height
                }));

                return { thumbs: localThumbs, photos: localPhotos };
            })
            .then(result => {
                if (result) {
                    scopedThis.setState(result);
                }
            });
    }

    render() {
        return (
            <GalleryBase
                photos={this.state.photos}
                thumbs={this.state.thumbs}
            />
        );
    }
}

export default Gallery;
