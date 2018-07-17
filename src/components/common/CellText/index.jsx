import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CellText.css";

class CellText extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <span className="cell-text">{this.props.children}</span>;
    }
}

export default CellText;
