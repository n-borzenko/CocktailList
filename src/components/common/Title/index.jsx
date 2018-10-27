import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Title.css";

function Title({ children, truncate }) {
    const className = classNames("title", {
        title_truncated: truncate,
    });
    return <span className={className}>{children}</span>;
}

Title.propTypes = {
    children: PropTypes.node.isRequired,
    truncate: PropTypes.bool.isRequired,
};

Title.defaultProps = {
    truncate: false,
};

export default Title;
