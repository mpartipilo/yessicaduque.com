import React from "react";
import PhotoGallery from "react-photo-gallery";
import Measure from "react-measure";
import Lightbox from "react-images";

import "./index.scss";

class GalleryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      totalPages: 1,
      loadedAll: false,
      currentImage: 0,
      cancelToken: null,
      dimensions: {
        width: -1,
        height: -1
      }
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {}

  openLightbox(event, obj) {
    this.setState({ currentImage: obj.index, lightboxIsOpen: true });
  }

  closeLightbox() {
    this.setState({ currentImage: 0, lightboxIsOpen: false });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  renderGallery() {
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => {
          const { width } = this.state.dimensions;
          let cols = 3;
          if (width <= 1024) {
            cols = 2;
          }
          if (width <= 480) {
            cols = 1;
          }
          return (
            <div ref={measureRef}>
              <PhotoGallery
                id="photoGallery"
                photos={this.props.thumbs}
                columns={cols}
                onClick={this.openLightbox}
              />
            </div>
          );
        }}
      </Measure>
    );
  }

  render() {
    return (
      <div>
        {this.renderGallery()}
        <Lightbox
          images={this.props.photos}
          backdropClosesModal
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={1200}
        />
      </div>
    );
  }
}

export default GalleryBase;
