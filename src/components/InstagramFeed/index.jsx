import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import FA from "react-fontawesome";
import PhotoGallery from "react-photo-gallery";
import Lightbox from "react-images";
import Measure from "react-measure";

class InstagramFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            thumbs: [],
            currentImage: 0,
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

    componentDidMount() {
        const capturedThis = this;

        fetch("/data/feed.json", { method: "get" })
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return [];
                },
                _ => {}
            )
            .then(
                json =>
                    json.items.slice(0, 6).map(p => {
                        const img = p.images.low_resolution;
                        const imgBig = p.images.standard_resolution;
                        return {
                            id: p.id,
                            thumbnail: img.url,
                            photo: imgBig.url,
                            width: img.width,
                            height: img.height,
                            text: p.text,
                            sourceUrl: p.link
                        };
                    }),
                _ => {}
            )
            .then(
                result => {
                    if (result) {
                        const localThumbs = result.map(p => ({
                            src: p.thumbnail,
                            width: p.width,
                            height: p.height
                        }));

                        const localPhotos = result.map(p => ({
                            src: p.photo,
                            srcset: [`${p.thumbnail} 480w`, `${p.photo} 800w`],
                            sizes: [
                                "(min-width: 480px) 50vw",
                                "(min-width: 1024px) 33.3vw",
                                "100vw"
                            ],
                            width: p.width,
                            height: p.height
                        }));

                        capturedThis.setState({
                            photos: localPhotos,
                            thumbs: localThumbs
                        });
                    }
                },
                _ => {}
            );
    }

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

    render() {
        return this.state.thumbs.length > 0 ? (
            <Container>
                <Row>
                    <Col lg="12" className="text-center">
                        <h2 className="section-heading">
                            <FA name="instagram" className="p-3" />Latest
                            Instagram posts:
                        </h2>
                        <hr className="primary" />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" className="text-center">
                        <Measure
                            bounds
                            onResize={contentRect => {
                                this.setState({
                                    dimensions: contentRect.bounds
                                });
                            }}
                        >
                            {({ measureRef }) => {
                                const { width } = this.state.dimensions;
                                let cols = 6;
                                if (width <= 640) {
                                    cols = 3;
                                }
                                if (width <= 480) {
                                    cols = 2;
                                }
                                return (
                                    <div ref={measureRef}>
                                        <PhotoGallery
                                            id="instagramGallery"
                                            photos={this.state.thumbs}
                                            columns={cols}
                                            onClick={this.openLightbox}
                                        />
                                    </div>
                                );
                            }}
                        </Measure>
                        <Lightbox
                            images={this.state.photos}
                            backdropClosesModal
                            onClose={this.closeLightbox}
                            onClickPrev={this.gotoPrevious}
                            onClickNext={this.gotoNext}
                            currentImage={this.state.currentImage}
                            isOpen={this.state.lightboxIsOpen}
                            width={640}
                        />
                    </Col>
                </Row>
            </Container>
        ) : (
            <div />
        );
    }
}

export default InstagramFeed;
