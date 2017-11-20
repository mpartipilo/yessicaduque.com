import React from "react";
import Gallery from "../components/Gallery";

import "../scss/gallery.scss";

class Index extends React.Component {
    render() {
        return (
            <div className="index-container" id="_portfolio">
                <Gallery />
            </div>
        );
    }
}

export default Index;
