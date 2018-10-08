import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./MenuLink.css";

class MenuLink extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        to: PropTypes.oneOfType([
            PropTypes.shape({
                pathname: PropTypes.string.isRequired,
                search: PropTypes.string,
            }),
            PropTypes.string,
        ]).isRequired,
        onClick: PropTypes.func,
    };

    render() {
        return (
            <NavLink
                className="menu-link"
                activeClassName="menu-link_selected"
                to={this.props.to}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </NavLink>
        );
    }
}

export default MenuLink;
