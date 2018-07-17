import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Caption.css";

class Caption extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <span className="caption">{this.props.children}</span>;
    }
}

export default Caption;
