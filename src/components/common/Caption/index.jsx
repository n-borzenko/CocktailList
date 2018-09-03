import React from "react";
import PropTypes from "prop-types";

import "./Caption.css";

function Caption({ children }) {
    return <span className="caption">{children}</span>;
}

Caption.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Caption;
