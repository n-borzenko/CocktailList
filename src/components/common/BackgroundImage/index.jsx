import React, { Component } from "react";
import { connect } from "react-redux";

import { locations } from "../../../constants/locations";

import "./BackgroundImage.css";

class BackgroundImage extends Component {
    imageType = () => {
        return (this.props.lastMenuPathname || locations.search).substring(1);
    };

    render() {
        const className = `background-image background-image_${this.imageType()}`;
        return <div className={className} />;
    }
}

export default connect(state => ({
    lastMenuPathname: state.locations.lastMenuPathname,
}))(BackgroundImage);
