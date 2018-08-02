import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./SelectableButton.css";

class SelectableButton extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
    };

    render() {
        const className = classNames("selectable-button", {
            "selectable-button_selected": this.props.selected,
        });
        return (
            <button className={className} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default SelectableButton;
