import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

function Header({ children }) {
    return <span className="header">{children}</span>;
}

Header.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Header;
