import React from "react";
import PhotoGallery from "react-photo-gallery";
import Measure from "react-measure";
import Carousel, { Modal, ModalGateway } from "react-images";
import Img from "gatsby-image";

const ImgWrapper = (props) => {
  console.log(props);
  const { onClick, photo, index, margin, ...rest } = props;
  return (
    <div
      className="gallery-base-img-wrapper"
      onClick={(e) => onClick(e, { index, photo })}
    >
      <Img fixed={photo} style={{ margin }} {...rest} />
    </div>
  );
};

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
        height: -1,
      },
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
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  renderGallery() {
    const { dimensions } = this.state;
    const { thumbs } = this.props;

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => {
          const { width } = dimensions;
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
                photos={thumbs}
                columns={cols}
                onClick={this.openLightbox}
                ImageComponent={ImgWrapper}
              />
            </div>
          );
        }}
      </Measure>
    );
  }

  render() {
    const { photos } = this.props;
    const { currentImage, lightboxIsOpen } = this.state;

    return (
      <div>
        {this.renderGallery()}
        <ModalGateway>
          {lightboxIsOpen ? (
            <Modal onClose={this.closeLightbox}>
              <Carousel views={photos} currentIndex={currentImage} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

export default GalleryBase;
