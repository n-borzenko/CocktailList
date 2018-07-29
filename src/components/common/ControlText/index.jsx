import React from "react";
import PropTypes from "prop-types";
import "./ControlText.css";

function ControlText({ children }) {
    return <span className="control-text">{children}</span>;
}

ControlText.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ControlText;
