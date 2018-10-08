import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { POPUP_ID } from "../../../constants/views";

import "./Popup.css";

class Popup extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    constructor(props) {
        super(props);
        this.element = document.createElement("div");
        this.element.className = "popup";
    }

    componentDidMount() {
        this.popup_parent = document.getElementById(POPUP_ID);
        this.popup_parent.appendChild(this.element);
    }

    componentWillUnmount() {
        this.popup_parent.removeChild(this.element);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.element);
    }
}

export default Popup;
