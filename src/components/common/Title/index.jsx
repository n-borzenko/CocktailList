import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Title.css";

class Title extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <span className="title">{this.props.children}</span>;
    }
}

export default Title;
