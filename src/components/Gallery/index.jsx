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

        const localPhotoInfo = this.props.images.map(p => ({
            src: p.src,
            width: p.width,
            height: p.height,
            width2x: p.width / 2,
            width3x: p.width / 3,
            height2x: p.height / 2,
            height3x: p.height / 3
        }));

        let localThumbs = localPhotoInfo.map(p => ({
            src: `http://imgproxy.yessicaduque.com/crop?width=380&height=380&quality=15&gravity=smart&url=${p.src}`,
            width: 380,
            height: 380,
            srcSet: [
                `http://imgproxy.yessicaduque.com/crop?width=380&height=380&quality=95&gravity=smart&url=${p.src} 380w`,
                `http://imgproxy.yessicaduque.com/crop?width=640&height=640&quality=95&gravity=smart&url=${p.src} 700w`,
                `http://imgproxy.yessicaduque.com/crop?width=1024&height=1024&quality=95&gravity=smart&url=${p.src} 900w`
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

        const localPhotos = localPhotoInfo.map(p => ({
            src: `http://imgproxy.yessicaduque.com/resize?width=${p.width3x}&height=${p.height3x}&quality=55nocrop=true&url=${p.src}`,
            width: p.width,
            height: p.height,
            srcset: [
                `http://imgproxy.yessicaduque.com/resize?width=${p.width3x}&height=${p.height3x}&quality=55&nocrop=true&url=${p.src} ${p.width3x}w`,
                `http://imgproxy.yessicaduque.com/resize?width=${p.width2x}&height=${p.height2x}&quality=75&nocrop=true&url=${p.src} ${p.width2x}w`,
                `${p.src}`
            ],
            sizes: [
                "(min-width: 400px) 33.3vw",
                "(min-width: 900px) 50vw",
                "100vw"
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
