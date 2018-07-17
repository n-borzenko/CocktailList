import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Header.css";

class Header extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        return <span className="header">{this.props.children}</span>;
    }
}

export default Header;
