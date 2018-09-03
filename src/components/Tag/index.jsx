import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Text from "../common/Text";

import "./Tag.css";

class Tag extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        type: PropTypes.number,
    };

    render() {
        const className = classNames("tag", {
            [`tag_${this.props.type}`]: this.props.type !== undefined,
        });
        return (
            <div className={className}>
                <Text truncate>{this.props.children}</Text>
            </div>
        );
    }
}

export default Tag;
