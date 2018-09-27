import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

import "./MenuLink.css";

class MenuLink extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        selected: PropTypes.bool.isRequired,
        to: PropTypes.string.isRequired,
    };

    render() {
        const className = classNames("menu-link", {
            "menu-link_selected": this.props.selected,
        });
        return (
            <Link className={className} to={this.props.to}>
                {this.props.children}
            </Link>
        );
    }
}

export default MenuLink;
