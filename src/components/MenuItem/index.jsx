import React, { Component } from "react";
import PropTypes from "prop-types";
import Subheader from "../common/Subheader";

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
            <div onClick={this.props.onClick}>
                <Subheader light={!this.props.selected}>
                    {this.props.children}
                </Subheader>
            </div>
        );
    }
}

export default MenuItem;
