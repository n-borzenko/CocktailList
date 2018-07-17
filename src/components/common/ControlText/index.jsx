import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ControlText.css";

class ControlText extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <span className="control-text">{this.props.children}</span>;
    }
}

export default ControlText;
