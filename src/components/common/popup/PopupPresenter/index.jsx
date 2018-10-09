import React, { Component } from "react";
import PropTypes from "prop-types";

import Popup from "../Popup";

class PopupPresenter extends Component {
    static propTypes = {
        showPopup: PropTypes.bool.isRequired,
        closePopup: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
            .isRequired,
    };

    checkWidth = () => {
        if (this.props.showPopup && window.innerWidth >= 592) {
            this.props.closePopup();
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.checkWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkWidth);
    }

    render() {
        return !this.props.showPopup ? null : (
            <Popup>{this.props.children}</Popup>
        );
    }
}

export default PopupPresenter;
