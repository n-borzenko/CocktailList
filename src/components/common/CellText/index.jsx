import React from "react";
import PropTypes from "prop-types";
import "./CellText.css";

function CellText({ children }) {
    return <span className="cell-text">{children}</span>;
}

CellText.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CellText;
