import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Subheader.css";

function Subheader({ children, light }) {
    const className = classNames("subheader", {
        subheader_light: light,
    });
    return <span className={className}>{children}</span>;
}

Subheader.propTypes = {
    children: PropTypes.node.isRequired,
    light: PropTypes.bool.isRequired,
};

Subheader.defaultProps = {
    light: false,
};

export default Subheader;
