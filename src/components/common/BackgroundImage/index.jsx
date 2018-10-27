import React, { Component } from "react";
import { connect } from "react-redux";

import "./BackgroundImage.css";

class BackgroundImage extends Component {
    imageType = () => {
        const index = this.props.location.lastIndexOf("/");
        return index > 0
            ? this.props.location.substring(1, index)
            : this.props.location.substring(1);
    };

    render() {
        const className = `background-image background-image_${this.imageType()}`;
        return <div className={className} />;
    }
}

export default connect(state => ({
    location: state.router.location.pathname,
}))(BackgroundImage);
