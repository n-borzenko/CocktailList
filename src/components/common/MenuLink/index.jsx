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
        isActive: PropTypes.func,
        location: PropTypes.object,
    };

    render() {
        return (
            <NavLink
                location={this.props.location}
                className="menu-link"
                activeClassName="menu-link_selected"
                to={this.props.to}
                onClick={this.props.onClick}
                isActive={this.props.isActive}
            >
                {this.props.children}
            </NavLink>
        );
    }
}

export default MenuLink;
