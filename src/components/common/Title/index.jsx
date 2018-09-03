import React from "react";
import PropTypes from "prop-types";

import "./Title.css";

function Title({ children }) {
    return <span className="title">{children}</span>;
}

Title.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Title;
