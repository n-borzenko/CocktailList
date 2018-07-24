import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Text.css";

function Text({ children, truncate }) {
    const className = classNames("text", {
        text_truncated: truncate,
    });
    return <span className={className}>{children}</span>;
}

Text.propTypes = {
    children: PropTypes.node.isRequired,
    truncate: PropTypes.bool.isRequired,
};

Text.defaultProps = {
    truncate: false,
};

export default Text;
