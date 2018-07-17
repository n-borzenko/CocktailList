import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Text.css";

class Text extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        truncate: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        truncate: false,
    };

    render() {
        let className = classNames("text", {
            text_truncated: this.props.truncate,
        });
        return <span className={className}>{this.props.children}</span>;
    }
}

export default Text;
