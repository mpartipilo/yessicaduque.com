import React from "react";
import GalleryBase from "../GalleryBase";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    const { limit, images } = this.props;

    const localThumbs = images.map(p => p.thumb);

    this.state = {
      photos: images.map(p => p.picture),
      thumbs: limit ? localThumbs.slice(0, limit) : localThumbs
    };
  }

  render() {
    const { photos, thumbs } = this.state;
    return <GalleryBase photos={photos} thumbs={thumbs} />;
  }
}

export default Gallery;
