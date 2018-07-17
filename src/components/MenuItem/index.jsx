import React, { Component } from "react";
import PropTypes from "prop-types";
import Subheader from "../common/Subheader";
import "./MenuItem.css";

class MenuItem extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        selected: false,
    };

    render() {
        return (
            <div className="menu-item" onClick={this.props.onClick}>
                <Subheader light={!this.props.selected}>
                    {this.props.children}
                </Subheader>
            </div>
        );
    }
}

export default MenuItem;
