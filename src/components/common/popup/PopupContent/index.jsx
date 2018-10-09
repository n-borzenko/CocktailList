import React, { Component } from "react";
import PropTypes from "prop-types";

import BackgroundImage from "../../BackgroundImage";
import MainHeader from "../../MainHeader";

import "./PopupContent.css";

class PopupContent extends Component {
    static propTypes = {
        title: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
            .isRequired,
    };

    render() {
        return (
            <div className="popup-content">
                <BackgroundImage />
                <div className="popup-content__container">
                    <MainHeader
                        type={MainHeader.types.popup}
                        compactTitle={this.props.title}
                        onClick={this.props.onClick}
                    />
                    <div className="popup-content__data">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupContent;
