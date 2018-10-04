import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./MenuLink.css";

class MenuLink extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        to: PropTypes.string.isRequired,
    };

    render() {
        return (
            <NavLink
                className="menu-link"
                activeClassName="menu-link_selected"
                to={this.props.to}
            >
                {this.props.children}
            </NavLink>
        );
    }
}

export default MenuLink;
