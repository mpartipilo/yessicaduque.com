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

        let localThumbs = this.props.images.map(p => ({
            ...p.thumb2,
            srcSet: [
                `${p.thumb2.src} ${p.thumb2.width}w`,
                `${p.thumb3.src} ${p.thumb3.width}w`
            ],
            sizes: [
                "(max-width: 400px) 33.3vw",
                "(max-width: 900px) 50vw",
                "100vw"
            ]
        }));
        if (scopedThis.state.limit) {
            localThumbs = localThumbs.slice(0, scopedThis.state.limit);
        }

        const localPhotos = this.props.images.map(p => ({
            src: p.thumb2.src,
            width: p.width,
            height: p.height,
            srcset: [
                `${p.thumb2.src} ${p.thumb2.width}w`,
                `${p.thumb3.src} ${p.thumb3.width}w`,
                `${p.photo.src}`
            ]
        }));

        scopedThis.setState({ thumbs: localThumbs, photos: localPhotos });
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
