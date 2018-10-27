import React from "react";
import PropTypes from "prop-types";

import "./Subheader.css";

function Subheader({ children }) {
    return <span className="subheader">{children}</span>;
}

Subheader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Subheader;
