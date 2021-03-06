import React, { Component } from "react";
import PropTypes from "prop-types";

import Popup from "../Popup";

const MOBILE_MAX_WIDTH = 700;

class PopupPresenter extends Component {
    static propTypes = {
        showPopup: PropTypes.bool.isRequired,
        closePopup: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
            .isRequired,
    };

    componentDidMount() {
        window.addEventListener("resize", this.checkWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkWidth);
    }

    checkWidth = () => {
        if (this.props.showPopup && window.innerWidth >= MOBILE_MAX_WIDTH) {
            this.props.closePopup();
        }
    };

    render() {
        return !this.props.showPopup ? null : (
            <Popup>{this.props.children}</Popup>
        );
    }
}

export default PopupPresenter;
