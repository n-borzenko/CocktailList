import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Subheader.css";

class Subheader extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        light: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        light: false,
    };

    render() {
        let className = classNames("subheader", {
            subheader_light: this.props.light,
        });
        return <span className={className}>{this.props.children}</span>;
    }
}

export default Subheader;
